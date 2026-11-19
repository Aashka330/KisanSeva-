import { useState } from 'react';
import { AlertTriangle, AlertCircle, FlaskConical, Bug, Shield, Loader2, Sparkles } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
  getFertilizerRecommendation,
  getPesticideRecommendation,
  type FertilizerResult,
  type PesticideResult,
} from '../lib/api';

const selectClass = 'w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-leaf-light/50';

const riskColors: Record<string, string> = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
};

export default function SmartFarmAdvisor() {
  const [activeTab, setActiveTab] = useState<'fertilizer' | 'pesticide'>('fertilizer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fertResult, setFertResult] = useState<FertilizerResult | null>(null);
  const [pestResult, setPestResult] = useState<PesticideResult | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    location: 'Pune, Maharashtra',
    crop: 'Soybean',
    growthStage: 'Flowering',
    soilType: 'Loamy',
    weather: 'Partly Cloudy, 28°C',
    symptoms: 'Yellow spots on leaves, wilting edges',
  });

  const update = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setFertResult(null);
    setPestResult(null);

    try {
      if (activeTab === 'fertilizer') {
        const result = await getFertilizerRecommendation(formData);
        setFertResult(result);
      } else {
        const result = await getPesticideRecommendation(formData);
        setPestResult(result);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  const hasResult = activeTab === 'fertilizer' ? !!fertResult : !!pestResult;

  return (
    <Layout>
      <div className="bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Smart Farm Advisor' }]} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">Smart Farm Advisor</h1>
              <p className="mt-2 text-muted">
                Predictive agronomic models for precision fertilizer dosage, pathogen diagnosis, and targeted treatment.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 bg-green-100 text-green-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              KisanSeva Predictive Model Active
            </span>
          </div>

          <div className="flex gap-2 mb-8">
            {(['fertilizer', 'pesticide'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setError(null); }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize ${
                  activeTab === tab ? 'bg-deep-green text-white' : 'bg-surface border border-border text-muted'
                }`}
              >
                {tab === 'fertilizer' ? '🌱 Fertilizer Advisor' : '🐛 Pesticide Advisor'}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <Card className="lg:col-span-1">
              <h3 className="font-bold text-deep-green mb-4">Farm Conditions</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Location</label>
                  <input type="text" value={formData.location} onChange={update('location')} className={selectClass} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Crop</label>
                  <select className={selectClass} value={formData.crop} onChange={update('crop')}>
                    <option>Soybean</option><option>Wheat</option><option>Cotton</option>
                    <option>Rice</option><option>Sugarcane</option><option>Tomato</option>
                    <option>Onion</option><option>Chili</option><option>Maize</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Crop Growth Stage</label>
                  <select className={selectClass} value={formData.growthStage} onChange={update('growthStage')}>
                    <option>Germination</option><option>Vegetative</option><option>Flowering</option>
                    <option>Fruiting</option><option>Maturity</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Soil Type</label>
                  <select className={selectClass} value={formData.soilType} onChange={update('soilType')}>
                    <option>Loamy</option><option>Sandy</option><option>Clay</option>
                    <option>Black Soil</option><option>Red Soil</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Weather Conditions</label>
                  <select className={selectClass} value={formData.weather} onChange={update('weather')}>
                    <option>Partly Cloudy, 28°C</option>
                    <option>Sunny, 32°C</option>
                    <option>Rainy, 24°C</option>
                    <option>Hot & Humid, 36°C</option>
                    <option>Cool & Dry, 20°C</option>
                  </select>
                </div>
                {activeTab === 'pesticide' && (
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Visible Symptoms</label>
                    <textarea
                      className={selectClass}
                      rows={3}
                      value={formData.symptoms}
                      onChange={update('symptoms')}
                      placeholder="Describe what you see on the plant..."
                    />
                  </div>
                )}
                <Button
                  onClick={handleGenerate}
                  className="w-full"
                  icon={loading ? Loader2 : Sparkles}
                >
                  {loading ? 'Analyzing Farm Conditions...' : 'Get Predictive Recommendation'}
                </Button>
              </div>
            </Card>

            {/* Results */}
            <div className="lg:col-span-2">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <div>
                    <strong>Error:</strong> {error}
                  </div>
                </div>
              )}

              {loading && (
                <Card className="flex flex-col items-center justify-center h-64 gap-3">
                  <Loader2 className="w-8 h-8 text-leaf animate-spin" />
                  <p className="text-muted text-sm">Evaluating agronomic parameters & soil conditions...</p>
                </Card>
              )}

              {!loading && !hasResult && !error && (
                <Card className="flex items-center justify-center h-64 text-muted text-sm">
                  Fill in your farm details and click "Get Predictive Recommendation"
                </Card>
              )}

              {!loading && activeTab === 'fertilizer' && fertResult && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span>Agronomic model output calibrated for your specific crop, stage, and soil</span>
                  </div>
                  <Card>
                    <h3 className="font-bold text-deep-green mb-4 flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-leaf" /> Recommended Fertilizer
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { name: 'Nitrogen (N)', data: fertResult.nitrogen, color: 'bg-leaf-light/10' },
                        { name: 'Phosphorus (P)', data: fertResult.phosphorus, color: 'bg-warm-yellow/10' },
                        { name: 'Potassium (K)', data: fertResult.potassium, color: 'bg-beige' },
                      ].map(f => (
                        <div key={f.name} className={`${f.color} rounded-xl p-4`}>
                          <p className="font-bold text-deep-green text-sm">{f.name}</p>
                          <p className="text-xl font-bold text-leaf mt-2">{f.data.dosage}</p>
                          <p className="text-[11px] text-muted mt-2">{f.data.reason}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card>
                      <p className="text-xs font-semibold text-muted uppercase mb-2">⏰ Best Application Time</p>
                      <p className="text-sm text-deep-green">{fertResult.applicationTiming}</p>
                    </Card>
                    <Card>
                      <p className="text-xs font-semibold text-muted uppercase mb-2">🌿 Organic Alternative</p>
                      <p className="text-sm text-deep-green">{fertResult.organicAlternative}</p>
                    </Card>
                  </div>

                  <Card>
                    <h3 className="font-bold text-deep-green mb-2">Why this recommendation?</h3>
                    <p className="text-sm text-muted">{fertResult.explanation}</p>
                  </Card>
                </div>
              )}

              {!loading && activeTab === 'pesticide' && pestResult && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <span>Pathology diagnostic model output based on visible symptoms and crop conditions</span>
                  </div>
                  <Card>
                    <h3 className="font-bold text-deep-green mb-4 flex items-center gap-2">
                      <Bug className="w-5 h-5 text-leaf" /> Disease / Pest Diagnosis
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                        <div>
                          <p className="text-xs text-muted">Identified Disease / Pest</p>
                          <p className="font-bold text-deep-green mt-0.5">{pestResult.disease}</p>
                          <p className="text-xs text-muted mt-1">Active ingredient: {pestResult.activeIngredient}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${riskColors[pestResult.riskLevel] ?? 'bg-gray-100 text-gray-700'}`}>
                          Risk: {pestResult.riskLevel}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-beige rounded-xl">
                          <p className="text-xs text-muted mb-1">Recommended Treatment</p>
                          <p className="font-bold text-deep-green">{pestResult.treatment}</p>
                        </div>
                        <div className="p-4 bg-beige rounded-xl">
                          <p className="text-xs text-muted mb-1">🌿 Natural Alternative</p>
                          <p className="font-bold text-deep-green">{pestResult.naturalAlternative}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-beige rounded-xl">
                        <p className="text-xs text-muted mb-1">Application Method</p>
                        <p className="text-sm text-deep-green">{pestResult.applicationMethod}</p>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-xs font-semibold text-blue-700 mb-1">🔬 AI Diagnosis</p>
                        <p className="text-sm text-deep-green">{pestResult.explanation}</p>
                      </div>
                    </div>
                  </Card>

                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                    <Shield className="w-6 h-6 text-red-600 shrink-0" />
                    <div>
                      <p className="font-bold text-red-800 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Safety Notice
                      </p>
                      <p className="text-sm text-red-700 mt-1">{pestResult.precautions}</p>
                      <p className="text-xs text-red-600 mt-2">
                        Always consult a certified agricultural expert before applying treatments. Follow local regulations.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
