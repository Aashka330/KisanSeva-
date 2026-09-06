import { useState } from 'react';
import { MapPin, Thermometer, Droplets, CloudRain, Wind, Gauge, Navigation } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/ui/Card';
import DemoBadge from '../components/ui/DemoBadge';
import { weatherData } from '../data/synthetic';

export default function WeatherIntelligence() {
  const [location, setLocation] = useState(weatherData.location);

  const weatherMetrics = [
    { icon: Thermometer, label: 'Temperature', value: `${weatherData.temperature}°C`, color: 'text-red-500' },
    { icon: Droplets, label: 'Humidity', value: `${weatherData.humidity}%`, color: 'text-blue-500' },
    { icon: CloudRain, label: 'Rainfall', value: `${weatherData.rainfall} mm`, color: 'text-blue-400' },
    { icon: Wind, label: 'Wind Speed', value: `${weatherData.windSpeed} km/h`, color: 'text-muted' },
    { icon: Gauge, label: 'AQI', value: `${weatherData.aqi}`, color: 'text-warm-yellow-dark' },
    { icon: Droplets, label: 'Soil Moisture', value: `${weatherData.soilMoisture}%`, color: 'text-leaf' },
  ];

  return (
    <Layout>
      <div className="bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Weather Intelligence' }]} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">Location & Weather Intelligence</h1>
              <p className="mt-2 text-muted">Real-time weather data and location-based farming recommendations.</p>
            </div>
            <DemoBadge />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
              <h3 className="font-bold text-deep-green mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-leaf" /> Select Location
              </h3>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm mb-3"
              />
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-leaf text-leaf text-sm font-medium hover:bg-leaf-light/10">
                <Navigation className="w-4 h-4" /> Use GPS Location
              </button>

              {/* Map placeholder */}
              <div className="mt-4 h-48 bg-gradient-to-br from-leaf-light/20 to-deep-green/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(rgba(27,67,50,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,67,50,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }} />
                <MapPin className="w-8 h-8 text-leaf" />
              </div>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {weatherMetrics.map(m => (
                  <Card key={m.label} className="text-center">
                    <m.icon className={`w-6 h-6 ${m.color} mx-auto mb-2`} />
                    <p className="text-xs text-muted">{m.label}</p>
                    <p className="text-xl font-bold text-deep-green font-heading">{m.value}</p>
                  </Card>
                ))}
              </div>

              <Card>
                <h3 className="font-bold text-deep-green mb-4">7-Day Forecast</h3>
                <div className="grid grid-cols-7 gap-2">
                  {weatherData.forecast.map(day => (
                    <div key={day.day} className="text-center p-3 bg-beige rounded-xl">
                      <p className="text-xs font-medium text-deep-green">{day.day}</p>
                      <p className="text-lg font-bold text-deep-green mt-1">{day.temp}°</p>
                      <p className="text-[10px] text-muted mt-1">{day.rain}% rain</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-bold text-deep-green mb-2">Based on your location and current conditions...</h3>
                <p className="text-sm text-muted mb-4">Recommendations for {location}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(weatherData.recommendations).map(([key, items]) => (
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
