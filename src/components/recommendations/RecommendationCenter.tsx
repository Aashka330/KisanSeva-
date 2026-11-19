import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Droplets, Target, Navigation, ChevronRight, CheckCircle, Loader2,
  AlertCircle, Thermometer, CloudRain,
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import {
  states, districts, soilTypes, waterLevels, seasons,
} from '../../data/synthetic';
import {
  getDynamicRecommendations,
  type FarmSeason,
  type DynamicRecommendation,
} from '../../lib/agriEngine';
import { fetchFarmLocationConditions, type FarmLocationConditions } from '../../lib/locationAgronomy';

type Tab = 'crops' | 'plants' | 'trees';

export default function RecommendationCenter() {
  const [tab, setTab] = useState<Tab>('crops');
  const [state, setState] = useState('Maharashtra');
  const [district, setDistrict] = useState('Pune');
  const [locationName, setLocationName] = useState('Shivaji Nagar');
  const [soil, setSoil] = useState('Loamy');
  const [water, setWater] = useState('Medium');
  const [season, setSeason] = useState('Kharif');
  const [modalItem, setModalItem] = useState<DynamicRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState<FarmLocationConditions | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const profile = useMemo(() => ({
    state,
    district,
    soil,
    water,
    season,
  }), [state, district, soil, water, season]);

  const recommendations = useMemo(() => {
    return getDynamicRecommendations(tab, profile, locationData?.seasonalClimate ?? {});
  }, [tab, profile, locationData]);
  const selectedClimate = locationData?.seasonalClimate[season as FarmSeason];

  const loadLocationData = async (coordinates?: { latitude: number; longitude: number }) => {
    setLoading(true);
    setLocationData(null);
    setLocationError(null);
    try {
      const result = await fetchFarmLocationConditions({
        city: locationName,
        district,
        state,
        ...(coordinates ? { coordinates } : {}),
      });
      setLocationData(result);
    } catch (error: unknown) {
      setLocationData(null);
      setLocationError(error instanceof Error ? error.message : 'Could not load local conditions.');
    } finally {
      setLoading(false);
    }
  };

  const handleGPS = () => {
    if (!navigator.geolocation) {
      setLocationError('GPS location is not supported by this browser.');
      return;
    }
    setLoading(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      position => {
        void loadLocationData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        setLoading(false);
        setLocationError(`Could not read GPS location: ${error.message}`);
      },
      { enableHighAccuracy: false, timeout: 15000 },
    );
  };

  const selectClass = 'w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-leaf-light/50';

  return (
    <section className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-leaf-light/20 text-leaf mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Location-based crop suitability
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">
            Crop Recommendation Center
          </h2>
          <p className="mt-3 text-muted text-lg max-w-2xl mx-auto">
            Compare crops against your location's historical climate and your farm's soil and water conditions.
          </p>
          <p className="mt-2 text-xs text-muted">
            Rankings compare real location climate with general crop reference bands and catalog ranges for season and region, plus your soil and water inputs.
            Scores are relative matches—not probabilities, yield forecasts, or guarantees.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <Card className="lg:col-span-1">
            <h3 className="font-bold text-deep-green mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-leaf" /> Farm Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">State</label>
                <select value={state} onChange={e => {
                  setState(e.target.value);
                  setDistrict(districts[e.target.value]?.[0] ?? '');
                  setLocationData(null);
                  setLocationError(null);
                }} className={selectClass}>
                  {states.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">District</label>
                <select value={district} onChange={e => {
                  setDistrict(e.target.value);
                  setLocationData(null);
                  setLocationError(null);
                }} className={selectClass}>
                  {(districts[state] ?? []).map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">City / Village</label>
                <input
                  type="text"
                  placeholder="Enter city or village"
                  value={locationName}
                  onChange={e => {
                    setLocationName(e.target.value);
                    setLocationData(null);
                    setLocationError(null);
                  }}
                  className={selectClass}
                />
              </div>
              <button
                type="button"
                onClick={handleGPS}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-leaf text-leaf text-sm font-medium hover:bg-leaf-light/10 disabled:opacity-50 transition-colors"
              >
                <Navigation className="w-4 h-4" /> Use GPS Location
              </button>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">Soil Type</label>
                <select value={soil} onChange={e => setSoil(e.target.value)} className={selectClass}>
                  {soilTypes.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">Water Availability</label>
                <select value={water} onChange={e => setWater(e.target.value)} className={selectClass}>
                  {waterLevels.map(w => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">Season</label>
                <select value={season} onChange={e => setSeason(e.target.value)} className={selectClass}>
                  {seasons.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <Button onClick={() => void loadLocationData()} className="w-full" icon={loading ? Loader2 : Target} disabled={loading}>
                {loading ? 'Loading weather and climate...' : 'Fetch Location Data & Rank'}
              </Button>
            </div>
          </Card>

          {/* Results */}
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-6">
              {(['crops', 'plants', 'trees'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    tab === t ? 'bg-deep-green text-white shadow-soft' : 'bg-surface text-muted border border-border hover:border-leaf'
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            {locationError && (
              <div className="mb-4 p-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{locationError} No location-specific ranking is shown until local data loads successfully.</span>
              </div>
            )}

            {locationData ? (
              <div className="mb-5 p-4 rounded-xl border border-leaf/20 bg-surface">
                <p className="text-sm font-semibold text-deep-green">
                  Local conditions: {locationData.locationName}
                </p>
                <p className="mt-1 text-xs text-muted">
                  Current {locationData.currentTemperatureC.toFixed(1)}°C
                  {locationData.currentSoilTemperatureC !== null && ` · Surface soil ${locationData.currentSoilTemperatureC.toFixed(1)}°C`}
                  {locationData.currentSoilMoisturePercent !== null && ` · Modelled surface moisture ${locationData.currentSoilMoisturePercent.toFixed(0)}%`}
                  {' · '}Next 7 days: {locationData.forecastRainfall7dMm.toFixed(0)} mm rain, max temp average {locationData.forecastAverageMaxTemperatureC.toFixed(1)}°C
                </p>
                {selectedClimate ? (
                  <p className="mt-1 text-xs text-muted">
                    {selectedClimate.years}-year gridded {season} climate average: {selectedClimate.averageTemperatureC.toFixed(1)}°C, {selectedClimate.averageRainfallMm.toFixed(0)} mm seasonal rainfall.
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-warm-yellow-dark">
                    {locationData.historyWarning ?? `No ${season} climate record is available; no crop ranking can be calculated.`}
                  </p>
                )}
                <p className="mt-1 text-[11px] text-muted">
                  Weather and gridded climate from <a className="underline" href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a>
                  {' · '}Soil type ({soil}) is your selected field value; gridded surface moisture is not a farm soil test.
                  {' · '}Updated {new Date(locationData.fetchedAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="mb-5 text-xs text-muted">
                Fetch location data to calculate a ranking. No default or synthetic crop ranking is shown.
              </p>
            )}

            {loading ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-surface rounded-2xl border border-border p-6 animate-pulse">
                    <div className="h-4 bg-beige-dark rounded w-1/2 mb-4" />
                    <div className="h-8 bg-beige-dark rounded w-3/4 mb-2" />
                    <div className="h-20 bg-beige-dark rounded" />
                  </div>
                ))}
              </div>
            ) : recommendations.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendations.map((rec, i) => (
                  <motion.div
                    key={rec.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card hover className="h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-xs text-muted font-medium">Recommendation</p>
                            <h4 className="text-lg font-bold text-deep-green font-heading">{rec.name}</h4>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted">Relative fit</p>
                            <p className="text-2xl font-bold text-leaf">{rec.suitability}%</p>
                          </div>
                        </div>

                        <div className="w-full bg-beige rounded-full h-2 mb-4">
                          <div className="bg-leaf-light h-2 rounded-full transition-all" style={{ width: `${rec.suitability}%` }} />
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                          {[
                            { label: 'Temperature', value: rec.temperatureFit, icon: Thermometer },
                            { label: 'Season rainfall', value: rec.rainfallFit, icon: CloudRain },
                            { label: 'Selected soil', value: rec.soilFit, icon: CheckCircle },
                            { label: 'Water availability', value: rec.waterFit, icon: Droplets },
                          ].map(factor => (
                            <div key={factor.label} className="flex items-center gap-2">
                              <factor.icon className="w-4 h-4 text-muted shrink-0" />
                              <span className="text-muted">{factor.label}: <strong className="text-deep-green">{factor.value}%</strong></span>
                            </div>
                          ))}
                        </div>

                        <p className="mt-3 text-xs text-muted/80 bg-beige/50 p-2 rounded-lg">
                          {rec.explanation}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-border">
                          <span className="text-xs text-muted">
                            Season fit: <strong className="text-deep-green">{rec.seasonFit}%</strong>
                          </span>
                          <span className="text-xs text-muted">
                            Water need: <strong className="text-deep-green">{rec.water}</strong>
                          </span>
                        </div>

                        <button
                          onClick={() => setModalItem(rec)}
                          className="mt-3 w-full flex items-center justify-center gap-1 text-sm font-semibold text-leaf hover:text-deep-green transition-colors"
                        >
                          View Detailed Analysis <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="py-12 text-center text-sm text-muted">
                {locationData
                  ? `No ${tab} ranking was produced because ${season} climate data is unavailable for this location.`
                  : 'Fetch location weather and historical climate to see crop rankings.'}
              </Card>
            )}
          </div>
        </div>
      </div>

      <Modal open={!!modalItem} onClose={() => setModalItem(null)} title={`${modalItem?.name} — Location Fit`}>
        {modalItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-leaf bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
              <MapPin className="w-4 h-4 text-green-600 shrink-0" />
              Location data for {locationData?.locationName ?? `${district}, ${state}`}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Relative Fit Score', value: `${modalItem.suitability}%`, icon: CheckCircle },
                { label: 'Temperature Fit', value: `${modalItem.temperatureFit}%`, icon: Thermometer },
                { label: 'Season Rainfall Fit', value: `${modalItem.rainfallFit}%`, icon: CloudRain },
                { label: 'Selected Soil Fit', value: `${modalItem.soilFit}%`, icon: CheckCircle },
                { label: 'Water Availability Fit', value: `${modalItem.waterFit}%`, icon: Droplets },
                { label: 'Water Requirement', value: modalItem.water, icon: Droplets },
                { label: 'Season Fit', value: `${modalItem.seasonFit}%`, icon: Target },
              ].map(item => (
                <div key={item.label} className="bg-beige rounded-xl p-3">
                  <p className="text-xs text-muted">{item.label}</p>
                  <p className="font-bold text-deep-green text-sm mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted">{modalItem.explanation}</p>
            <Button to="/environmental-impact" className="w-full">View Carbon & Environmental Impact</Button>
          </div>
        )}
      </Modal>
    </section>
  );
}
