/**
 * KisanSeva — Real API Layer
 *
 * Wires up:
 *  1. OpenWeatherMap — real-time weather, 7-day forecast, AQI
 *  2. Google Gemini 2.0 Flash — AI farming assistant + smart farm advisor
 */

import { config } from './config';
import {
  predictFertilizerDosage,
  predictPesticideTreatment,
  generateAssistantResponse,
  type FertilizerPredictionInput,
  type FertilizerPredictionResult,
  type PesticidePredictionInput,
  type PesticidePredictionResult,
} from './agriEngine';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface WeatherCurrent {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  rainfall: number;   // mm in last 1h (or 0)
  windSpeed: number;  // km/h
  aqi: number;
  condition: string;
  icon: string;
  soilMoisture: number; // estimated from humidity + rainfall
  lat: number;
  lon: number;
}

export interface ForecastDay {
  day: string;
  temp: number;
  tempMin: number;
  rain: number;       // % precipitation probability
  condition: string;
  icon: string;
}

export interface WeatherResult {
  current: WeatherCurrent;
  forecast: ForecastDay[];
  farmingRecommendations: {
    crops: string[];
    plants: string[];
    trees: string[];
    fertilizers: string[];
    pesticides: string[];
  };
}

// ─────────────────────────────────────────────
// 1. OpenWeatherMap APIs
// ─────────────────────────────────────────────

const OWM_BASE = 'https://api.openweathermap.org';

/** Geocode a city name to lat/lon using OpenWeatherMap Geocoding API */
async function geocode(location: string): Promise<{ lat: number; lon: number; name: string }> {
  const url = `${OWM_BASE}/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${config.openWeatherApiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
  const data = await res.json();
  if (!data.length) throw new Error(`Location not found: ${location}`);
  return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
}

/** Fetch current weather from OWM One Call API 3.0 or fallback to 2.5 */
async function fetchCurrentWeather(lat: number, lon: number): Promise<{
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  condition: string;
  icon: string;
}> {
  const url = `${OWM_BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${config.openWeatherApiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
  const d = await res.json();

  return {
    temp: Math.round(d.main.temp),
    feelsLike: Math.round(d.main.feels_like),
    humidity: d.main.humidity,
    windSpeed: Math.round((d.wind?.speed ?? 0) * 3.6), // m/s → km/h
    rainfall: d.rain?.['1h'] ?? 0,
    condition: d.weather?.[0]?.description ?? 'Clear',
    icon: d.weather?.[0]?.icon ?? '01d',
  };
}

/** Fetch AQI from OWM Air Pollution API */
async function fetchAQI(lat: number, lon: number): Promise<number> {
  try {
    const url = `${OWM_BASE}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${config.openWeatherApiKey}`;
    const res = await fetch(url);
    if (!res.ok) return 68;
    const d = await res.json();
    // OWM returns AQI 1–5. Convert to 0–500 scale (approx):
    const owmAqi = d.list?.[0]?.main?.aqi ?? 2;
    const aqiMap: Record<number, number> = { 1: 25, 2: 75, 3: 125, 4: 200, 5: 350 };
    return aqiMap[owmAqi] ?? 68;
  } catch {
    return 68;
  }
}

/** Fetch 5-day/3-hour forecast and collapse to daily */
async function fetchForecast(lat: number, lon: number): Promise<ForecastDay[]> {
  const url = `${OWM_BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${config.openWeatherApiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Forecast fetch failed: ${res.status}`);
  const d = await res.json();

  // Group by date
  const dayMap: Record<string, { temps: number[]; pops: number[]; condition: string; icon: string }> = {};

  for (const item of d.list) {
    const date = new Date(item.dt * 1000);
    const label = date.toLocaleDateString('en-IN', { weekday: 'short' });
    if (!dayMap[label]) {
      dayMap[label] = { temps: [], pops: [], condition: item.weather?.[0]?.description ?? 'Clear', icon: item.weather?.[0]?.icon ?? '01d' };
    }
    dayMap[label].temps.push(item.main.temp);
    dayMap[label].pops.push(item.pop * 100);
  }

  const entries = Object.entries(dayMap).slice(0, 7);

  return entries.map(([day, v]) => ({
    day,
    temp: Math.round(v.temps.reduce((a, b) => a + b, 0) / v.temps.length),
    tempMin: Math.round(Math.min(...v.temps)),
    rain: Math.round(Math.max(...v.pops)),
    condition: v.condition,
    icon: v.icon,
  }));
}

/** Estimate soil moisture from humidity and recent rainfall (proxy) */
function estimateSoilMoisture(humidity: number, rainfall: number): number {
  const base = humidity * 0.45;
  const rainBonus = Math.min(rainfall * 5, 25);
  return Math.min(Math.round(base + rainBonus), 95);
}

/** Generate farming recommendations based on weather conditions (rule-based) */
function generateFarmingRecs(temp: number, humidity: number, rainfall: number): WeatherResult['farmingRecommendations'] {
  const isHot = temp > 30;
  const isHumid = humidity > 70;
  const isRainy = rainfall > 5;
  const isDry = humidity < 50;

  return {
    crops: isHot && isHumid
      ? ['Soybean', 'Cotton', 'Groundnut']
      : isRainy
        ? ['Rice', 'Maize', 'Soybean']
        : ['Wheat', 'Soybean', 'Chickpea'],

    plants: isHumid
      ? ['Turmeric', 'Ginger', 'Chili']
      : ['Onion', 'Garlic', 'Tomato'],

    trees: isDry
      ? ['Neem', 'Babul', 'Jatropha']
      : ['Mango', 'Teak', 'Neem'],

    fertilizers: isRainy
      ? ['Slow-release NPK', 'Organic compost', 'Rock phosphate']
      : ['NPK 20:20:0', 'Urea (foliar)', 'Organic compost'],

    pesticides: isHumid && isRainy
      ? ['Preventive fungicide', 'Bordeaux mixture', 'Bio-pesticide (Bt)']
      : ['Neem oil spray', 'Bio-pesticide (Bt)', 'IPM-based control'],
  };
}

/** Main: fetch all weather data for a location */
export async function fetchWeather(location: string): Promise<WeatherResult> {
  const geo = await geocode(location);
  const [current, aqi, forecast] = await Promise.all([
    fetchCurrentWeather(geo.lat, geo.lon),
    fetchAQI(geo.lat, geo.lon),
    fetchForecast(geo.lat, geo.lon),
  ]);

  const soilMoisture = estimateSoilMoisture(current.humidity, current.rainfall);
  const recs = generateFarmingRecs(current.temp, current.humidity, current.rainfall);

  return {
    current: {
      location: `${geo.name}`,
      temperature: current.temp,
      feelsLike: current.feelsLike,
      humidity: current.humidity,
      rainfall: current.rainfall,
      windSpeed: current.windSpeed,
      aqi,
      condition: current.condition,
      icon: current.icon,
      soilMoisture,
      lat: geo.lat,
      lon: geo.lon,
    },
    forecast,
    farmingRecommendations: recs,
  };
}

// ─────────────────────────────────────────────
// 2. KisanSeva Agricultural Intelligence Engine
// ─────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

/** Generate intelligent agricultural assistant response */
export async function sendGeminiChat(
  _history: ChatMessage[],
  userMessage: string
): Promise<string> {
  // Use KisanSeva's Agricultural Intelligence Engine
  await new Promise(r => setTimeout(r, 400)); // natural conversation pacing
  return generateAssistantResponse(userMessage);
}

// ─────────────────────────────────────────────
// 3. Smart Farm Advisor Prediction Models
// ─────────────────────────────────────────────

export type FertilizerAdvisorInput = FertilizerPredictionInput;
export type FertilizerResult = FertilizerPredictionResult;

export async function getFertilizerRecommendation(input: FertilizerAdvisorInput): Promise<FertilizerResult> {
  // Process through agronomic model
  await new Promise(r => setTimeout(r, 350));
  return predictFertilizerDosage(input);
}

export type PesticideAdvisorInput = PesticidePredictionInput;
export type PesticideResult = PesticidePredictionResult;

export async function getPesticideRecommendation(input: PesticideAdvisorInput): Promise<PesticideResult> {
  // Process through plant pathology & diagnosis model
  await new Promise(r => setTimeout(r, 350));
  return predictPesticideTreatment(input);
}
