import { useState, useCallback } from 'react';
import { MapPin, Thermometer, Droplets, CloudRain, Wind, Gauge, Navigation, Search, Loader2, AlertCircle, Eye } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/ui/Card';
import { fetchWeather, type WeatherResult } from '../lib/api';
import { hasOpenWeather } from '../lib/config';
import { weatherData as syntheticWeather } from '../data/synthetic';

// Convert OWM icon code to emoji
function weatherEmoji(icon: string): string {
  if (icon.startsWith('01')) return '☀️';
  if (icon.startsWith('02')) return '🌤️';
  if (icon.startsWith('03') || icon.startsWith('04')) return '☁️';
  if (icon.startsWith('09') || icon.startsWith('10')) return '🌧️';
  if (icon.startsWith('11')) return '⛈️';
  if (icon.startsWith('13')) return '❄️';
  if (icon.startsWith('50')) return '🌫️';
  return '🌤️';
}

function aqiBadge(aqi: number) {
  if (aqi <= 50) return { label: 'Good', color: 'text-green-600 bg-green-50' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-600 bg-yellow-50' };
  if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', color: 'text-orange-600 bg-orange-50' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-600 bg-red-50' };
  return { label: 'Very Unhealthy', color: 'text-purple-700 bg-purple-50' };
}

export default function WeatherIntelligence() {
  const [locationInput, setLocationInput] = useState('Pune, Maharashtra');
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const isLive = hasOpenWeather();

  const handleSearch = useCallback(async () => {
    if (!locationInput.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchWeather(locationInput);
      setWeather(result);
      setSearched(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  }, [locationInput]);

  const handleGPS = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported in this browser.');
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          // Reverse geocode using OWM
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
          );
          const geo = await res.json();
          const name = geo?.[0]?.name ?? `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
          setLocationInput(name);
          const result = await fetchWeather(name);
          setWeather(result);
          setSearched(true);
        } catch (e: unknown) {
          setError(e instanceof Error ? e.message : 'GPS fetch failed');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(`GPS error: ${err.message}`);
        setLoading(false);
      }
    );
  }, []);

  // Use live weather if fetched, otherwise fall back to synthetic for initial display
  const current = weather?.current;
  const forecast = weather?.forecast ?? syntheticWeather.forecast.map(d => ({
    day: d.day, temp: d.temp, tempMin: d.temp - 3, rain: d.rain, condition: 'Partly cloudy', icon: '02d',
  }));
  const recs = weather?.farmingRecommendations ?? syntheticWeather.recommendations;
  const displayLocation = current?.location ?? locationInput;

  const metrics = current
    ? [
        { icon: Thermometer, label: 'Temperature', value: `${current.temperature}°C`, sub: `Feels like ${current.feelsLike}°C`, color: 'text-red-500' },
        { icon: Droplets, label: 'Humidity', value: `${current.humidity}%`, sub: 'Relative humidity', color: 'text-blue-500' },
        { icon: CloudRain, label: 'Rainfall', value: `${current.rainfall} mm`, sub: 'Last 1 hour', color: 'text-blue-400' },
        { icon: Wind, label: 'Wind Speed', value: `${current.windSpeed} km/h`, sub: 'Current wind', color: 'text-gray-500' },
        { icon: Gauge, label: 'AQI', value: `${current.aqi}`, sub: aqiBadge(current.aqi).label, color: 'text-amber-600' },
        { icon: Eye, label: 'Soil Moisture', value: `${current.soilMoisture}%`, sub: 'Estimated', color: 'text-leaf' },
      ]
    : [
        { icon: Thermometer, label: 'Temperature', value: `${syntheticWeather.temperature}°C`, sub: 'Demo data', color: 'text-red-500' },
        { icon: Droplets, label: 'Humidity', value: `${syntheticWeather.humidity}%`, sub: 'Demo data', color: 'text-blue-500' },
        { icon: CloudRain, label: 'Rainfall', value: `${syntheticWeather.rainfall} mm`, sub: 'Demo data', color: 'text-blue-400' },
        { icon: Wind, label: 'Wind Speed', value: `${syntheticWeather.windSpeed} km/h`, sub: 'Demo data', color: 'text-gray-500' },
        { icon: Gauge, label: 'AQI', value: `${syntheticWeather.aqi}`, sub: 'Demo data', color: 'text-amber-600' },
        { icon: Eye, label: 'Soil Moisture', value: `${syntheticWeather.soilMoisture}%`, sub: 'Demo data', color: 'text-leaf' },
      ];

  return (
    <Layout>
      <div className="bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Weather Intelligence' }]} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">Location & Weather Intelligence</h1>
              <p className="mt-2 text-muted">
                {isLive ? 'Live weather data from OpenWeatherMap.' : 'Add your API key to get real weather data.'}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isLive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {isLive ? '🟢 Live Data' : '⚠️ Demo Mode'}
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Location search panel */}
            <Card className="lg:col-span-1">
              <h3 className="font-bold text-deep-green mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-leaf" /> Select Location
              </h3>

              {!isLive && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200 text-xs text-yellow-800">
                  <strong>Setup required:</strong> Add your OpenWeatherMap API key to <code>.env</code> as <code>VITE_OPENWEATHER_API_KEY</code> to enable real weather.
                </div>
              )}

              <input
                type="text"
                value={locationInput}
                onChange={e => setLocationInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && isLive && handleSearch()}
                placeholder="e.g. Pune, Maharashtra"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm mb-3"
              />

              <button
                onClick={handleSearch}
                disabled={loading || !isLive}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-deep-green text-white text-sm font-medium hover:bg-deep-green/90 disabled:opacity-50 mb-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                {loading ? 'Fetching...' : 'Get Live Weather'}
              </button>

              <button
                onClick={handleGPS}
                disabled={loading || !isLive}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-leaf text-leaf text-sm font-medium hover:bg-leaf-light/10 disabled:opacity-50"
              >
                <Navigation className="w-4 h-4" /> Use GPS Location
              </button>

              {error && (
                <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              {searched && current && (
                <div className="mt-4 p-4 bg-gradient-to-br from-deep-green/5 to-leaf/10 rounded-xl border border-leaf/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl">{weatherEmoji(current.icon)}</span>
                    <div>
                      <p className="font-bold text-deep-green text-lg">{current.temperature}°C</p>
                      <p className="text-xs text-muted capitalize">{current.condition}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted mt-2">📍 {current.location}</p>
                </div>
              )}

              {!searched && (
                <div className="mt-4 h-32 bg-gradient-to-br from-leaf-light/20 to-deep-green/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-leaf mx-auto mb-1" />
                    <p className="text-xs text-muted">Enter location above</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Weather data panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {metrics.map(m => (
                  <Card key={m.label} className="text-center">
                    <m.icon className={`w-6 h-6 ${m.color} mx-auto mb-2`} />
                    <p className="text-xs text-muted">{m.label}</p>
                    <p className="text-xl font-bold text-deep-green font-heading">{m.value}</p>
                    {m.sub && <p className="text-[10px] text-muted mt-0.5">{m.sub}</p>}
                  </Card>
                ))}
              </div>

              {/* AQI color badge */}
              {current && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-surface">
                  <div className="text-2xl">💨</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-deep-green">Air Quality Index: {current.aqi}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-2 flex-1 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-transparent border-r-2 border-deep-green"
                          style={{ width: `${Math.min((current.aqi / 300) * 100, 100)}%` }}
                        />
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${aqiBadge(current.aqi).color}`}>
                        {aqiBadge(current.aqi).label}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 7-Day Forecast */}
              <Card>
                <h3 className="font-bold text-deep-green mb-4">
                  {searched ? '7-Day Live Forecast' : '7-Day Forecast'}
                </h3>
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {forecast.map((day, i) => (
                    <div key={i} className="text-center p-2 sm:p-3 bg-beige rounded-xl">
                      <p className="text-[10px] sm:text-xs font-medium text-deep-green">{day.day}</p>
                      <p className="text-base sm:text-lg my-0.5">{weatherEmoji(day.icon)}</p>
                      <p className="text-sm sm:text-base font-bold text-deep-green">{day.temp}°</p>
                      <p className="text-[9px] sm:text-[10px] text-muted">{day.rain}% rain</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Farming recommendations */}
              <Card>
                <h3 className="font-bold text-deep-green mb-2">
                  Based on your location and current conditions...
                </h3>
                <p className="text-sm text-muted mb-4">
                  {searched ? `Live recommendations for ${displayLocation}` : `Demo recommendations for ${displayLocation}`}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(recs).map(([key, items]) => (
                    <div key={key} className="bg-beige rounded-xl p-4">
                      <p className="text-xs font-semibold text-leaf uppercase mb-2">{key}</p>
                      <div className="flex flex-wrap gap-2">
                        {(items as string[]).map(item => (
                          <span key={item} className="px-2.5 py-1 bg-surface rounded-full text-xs font-medium text-deep-green border border-border">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
