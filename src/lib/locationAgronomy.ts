import type { FarmSeasonalClimate } from './agriEngine';

export interface FarmLocationRequest {
  city: string;
  district: string;
  state: string;
  coordinates?: { latitude: number; longitude: number };
}

export interface FarmLocationConditions {
  locationName: string;
  latitude: number;
  longitude: number;
  fetchedAt: string;
  currentTemperatureC: number;
  currentSoilTemperatureC: number | null;
  currentSoilMoisturePercent: number | null;
  forecastRainfall7dMm: number;
  forecastAverageMaxTemperatureC: number;
  seasonalClimate: FarmSeasonalClimate;
  historyWarning: string | null;
}

interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  admin1?: string;
  admin2?: string;
  population?: number;
}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

interface ForecastResponse {
  current?: {
    time?: string;
    temperature_2m?: number | null;
    soil_temperature_0cm?: number | null;
    soil_moisture_0_to_1cm?: number | null;
  };
  daily?: {
    time?: string[];
    precipitation_sum?: Array<number | null>;
    temperature_2m_max?: Array<number | null>;
  };
}

interface ArchiveResponse {
  daily?: {
    time?: string[];
    temperature_2m_max?: Array<number | null>;
    temperature_2m_min?: Array<number | null>;
    precipitation_sum?: Array<number | null>;
  };
}

interface SeasonAccumulator {
  temperatures: number[];
  rainfall: number;
}

const SEASON_MONTHS: Record<keyof FarmSeasonalClimate, number[]> = {
  Kharif: [6, 7, 8, 9],
  Rabi: [11, 12, 1, 2],
  Zaid: [3, 4, 5],
  Custom: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

const SEASON_MINIMUM_DAYS: Record<keyof FarmSeasonalClimate, number> = {
  Kharif: 110,
  Rabi: 105,
  Zaid: 75,
  Custom: 300,
};

async function requestJson<T>(url: URL): Promise<T> {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) {
    throw new Error(`Location data request failed (${response.status}).`);
  }
  return await response.json() as T;
}

function isFiniteNumber(value: number | null | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function scoreGeocodingResult(
  result: GeocodingResult,
  request: FarmLocationRequest,
): number {
  const normalized = (value: string) => value.trim().toLocaleLowerCase();
  const city = normalized(request.city);
  const district = normalized(request.district);
  const state = normalized(request.state);
  const name = normalized(result.name);
  const admin1 = normalized(result.admin1 ?? '');
  const admin2 = normalized(result.admin2 ?? '');
  let score = result.population ? Math.log10(result.population) / 10 : 0;

  if (city && name === city) score += 8;
  else if (city && name.includes(city)) score += 4;
  if (district && (admin2 === district || name === district)) score += 6;
  else if (district && (admin2.includes(district) || name.includes(district))) score += 3;
  if (state && admin1 === state) score += 7;

  return score;
}

async function geocodeLocation(
  request: FarmLocationRequest,
): Promise<{ latitude: number; longitude: number; locationName: string }> {
  if (request.coordinates) {
    const { latitude, longitude } = request.coordinates;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new Error('The selected GPS coordinates are invalid.');
    }
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      throw new Error('The selected GPS coordinates are outside valid latitude/longitude ranges.');
    }
    return {
      latitude,
      longitude,
      locationName: `GPS location (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`,
    };
  }

  const searchTerms = [...new Set([request.city.trim(), request.district.trim(), request.state.trim()].filter(Boolean))];
  if (searchTerms.length === 0) {
    throw new Error('Enter a city or village to look up local conditions.');
  }

  const candidates: GeocodingResult[] = [];
  for (const searchTerm of searchTerms) {
    const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
    url.search = new URLSearchParams({
      name: searchTerm,
      count: '10',
      language: 'en',
      format: 'json',
      countryCode: 'IN',
    }).toString();
    const response = await requestJson<GeocodingResponse>(url);
    candidates.push(...(response.results ?? []).filter(result => result.country_code === 'IN'));
    const bestMatch = candidates
      .map(result => scoreGeocodingResult(result, request))
      .sort((a, b) => b - a)[0];
    if (bestMatch !== undefined && bestMatch >= 15) break;
  }

  const match = candidates
    .sort((a, b) => scoreGeocodingResult(b, request) - scoreGeocodingResult(a, request))[0];
  if (!match) {
    throw new Error(`Could not find "${request.city || request.district}, ${request.state}" in India. Try a nearby town or use GPS.`);
  }

  return {
    latitude: match.latitude,
    longitude: match.longitude,
    locationName: [...new Set(
      [match.name, match.admin2, match.admin1].filter((value): value is string => Boolean(value)),
    )].join(', '),
  };
}

async function fetchForecast(latitude: number, longitude: number): Promise<ForecastResponse> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,soil_temperature_0cm,soil_moisture_0_to_1cm',
    daily: 'precipitation_sum,temperature_2m_max',
    forecast_days: '7',
    timezone: 'auto',
  }).toString();
  return requestJson<ForecastResponse>(url);
}

function archiveDateRange(): { start: string; end: string } {
  const endDate = new Date();
  endDate.setUTCDate(endDate.getUTCDate() - 5);
  const startDate = new Date(endDate);
  startDate.setUTCFullYear(startDate.getUTCFullYear() - 3);
  return {
    start: startDate.toISOString().slice(0, 10),
    end: endDate.toISOString().slice(0, 10),
  };
}

async function fetchHistoricalWeather(latitude: number, longitude: number): Promise<ArchiveResponse> {
  const { start, end } = archiveDateRange();
  const url = new URL('https://archive-api.open-meteo.com/v1/archive');
  url.search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    start_date: start,
    end_date: end,
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
    timezone: 'auto',
  }).toString();
  return requestJson<ArchiveResponse>(url);
}

function summarizeSeasonalClimate(data: ArchiveResponse): FarmSeasonalClimate {
  const daily = data.daily;
  if (!daily?.time || !daily.temperature_2m_max || !daily.temperature_2m_min || !daily.precipitation_sum) {
    throw new Error('The historical weather response was incomplete.');
  }

  const accumulators: Record<keyof FarmSeasonalClimate, Map<number, SeasonAccumulator>> = {
    Kharif: new Map(),
    Rabi: new Map(),
    Zaid: new Map(),
    Custom: new Map(),
  };
  const lengths = [
    daily.time.length,
    daily.temperature_2m_max.length,
    daily.temperature_2m_min.length,
    daily.precipitation_sum.length,
  ];
  const rowCount = Math.min(...lengths);

  for (let index = 0; index < rowCount; index += 1) {
    const date = daily.time[index];
    const maximum = daily.temperature_2m_max[index];
    const minimum = daily.temperature_2m_min[index];
    const rainfall = daily.precipitation_sum[index];
    if (!date || !isFiniteNumber(maximum) || !isFiniteNumber(minimum)) continue;

    const year = Number(date.slice(0, 4));
    const month = Number(date.slice(5, 7));
    const temperature = (maximum + minimum) / 2;
    for (const season of Object.keys(SEASON_MONTHS) as Array<keyof FarmSeasonalClimate>) {
      if (!SEASON_MONTHS[season].includes(month)) continue;
      const seasonYear = season === 'Rabi' && month >= 11 ? year + 1 : year;
      const seasons = accumulators[season];
      const accumulator = seasons.get(seasonYear) ?? { temperatures: [], rainfall: 0 };
      accumulator.temperatures.push(temperature);
      if (isFiniteNumber(rainfall)) accumulator.rainfall += rainfall;
      seasons.set(seasonYear, accumulator);
    }
  }

  const summaries: FarmSeasonalClimate = {};
  for (const season of Object.keys(SEASON_MONTHS) as Array<keyof FarmSeasonalClimate>) {
    const yearly = [...accumulators[season].values()]
      .filter(value => value.temperatures.length >= SEASON_MINIMUM_DAYS[season]);
    if (yearly.length === 0) continue;
    summaries[season] = {
      averageTemperatureC: yearly.reduce(
        (total, value) => total + value.temperatures.reduce((sum, temp) => sum + temp, 0) / value.temperatures.length,
        0,
      ) / yearly.length,
      averageRainfallMm: yearly.reduce((total, value) => total + value.rainfall, 0) / yearly.length,
      years: yearly.length,
    };
  }

  if (Object.keys(summaries).length === 0) {
    throw new Error('No usable historical climate observations were returned for this location.');
  }
  return summaries;
}

function readForecastSummary(data: ForecastResponse) {
  const currentTemperatureC = data.current?.temperature_2m;
  const daily = data.daily;
  if (!isFiniteNumber(currentTemperatureC) || !daily?.precipitation_sum || !daily.temperature_2m_max) {
    throw new Error('The local weather response did not include current temperature and a 7-day forecast.');
  }
  const rainfall = daily.precipitation_sum.filter(isFiniteNumber);
  const maximumTemperatures = daily.temperature_2m_max.filter(isFiniteNumber);
  if (rainfall.length === 0 || maximumTemperatures.length === 0) {
    throw new Error('The local weather response had no usable 7-day forecast values.');
  }

  const soilTemperature = data.current?.soil_temperature_0cm;
  const soilMoisture = data.current?.soil_moisture_0_to_1cm;
  return {
    currentTemperatureC,
    currentSoilTemperatureC: isFiniteNumber(soilTemperature) ? soilTemperature : null,
    currentSoilMoisturePercent: isFiniteNumber(soilMoisture)
      ? Math.max(0, Math.min(100, soilMoisture * 100))
      : null,
    forecastRainfall7dMm: rainfall.reduce((total, value) => total + value, 0),
    forecastAverageMaxTemperatureC: maximumTemperatures.reduce((total, value) => total + value, 0)
      / maximumTemperatures.length,
  };
}

export async function fetchFarmLocationConditions(
  request: FarmLocationRequest,
): Promise<FarmLocationConditions> {
  const location = await geocodeLocation(request);
  const [forecastResult, historyResult] = await Promise.allSettled([
    fetchForecast(location.latitude, location.longitude),
    fetchHistoricalWeather(location.latitude, location.longitude),
  ]);
  if (forecastResult.status === 'rejected') {
    throw new Error(`Could not fetch live local weather: ${forecastResult.reason instanceof Error ? forecastResult.reason.message : 'unknown error'}`);
  }

  const forecast = readForecastSummary(forecastResult.value);
  let seasonalClimate: FarmSeasonalClimate = {};
  let historyWarning: string | null = null;
  if (historyResult.status === 'fulfilled') {
    try {
      seasonalClimate = summarizeSeasonalClimate(historyResult.value);
    } catch (error: unknown) {
      historyWarning = error instanceof Error ? error.message : 'Historical climate data could not be summarized.';
    }
  } else {
    historyWarning = `Historical climate unavailable: ${historyResult.reason instanceof Error ? historyResult.reason.message : 'unknown error'}.`;
  }

  return {
    ...location,
    ...forecast,
    fetchedAt: new Date().toISOString(),
    seasonalClimate,
    historyWarning,
  };
}
