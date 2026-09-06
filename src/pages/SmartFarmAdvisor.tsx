import { useState } from 'react';
import { AlertTriangle, FlaskConical, Bug, Shield } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DemoBadge from '../components/ui/DemoBadge';

const selectClass = 'w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-leaf-light/50';

export default function SmartFarmAdvisor() {
  const [activeTab, setActiveTab] = useState<'fertilizer' | 'pesticide'>('fertilizer');
  const [generated, setGenerated] = useState(false);

  return (
    <Layout>
      <div className="bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Smart Farm Advisor' }]} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">Smart Farm Advisor</h1>
              <p className="mt-2 text-muted">Get fertilizer and pesticide recommendations based on your farm conditions.</p>
            </div>
            <DemoBadge label="Simulated / Demo Recommendations" />
          </div>

          <div className="flex gap-2 mb-8">
            {(['fertilizer', 'pesticide'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setGenerated(false); }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize ${
                  activeTab === tab ? 'bg-deep-green text-white' : 'bg-surface border border-border text-muted'
                }`}
              >
                {tab === 'fertilizer' ? 'Fertilizer Advisor' : 'Pesticide Advisor'}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
              <h3 className="font-bold text-deep-green mb-4">Farm Conditions</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Location</label>
                  <input type="text" defaultValue="Pune, Maharashtra" className={selectClass} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Crop</label>
                  <select className={selectClass} defaultValue="Soybean">
                    <option>Soybean</option><option>Wheat</option><option>Cotton</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Crop Growth Stage</label>
                  <select className={selectClass} defaultValue="Flowering">
                    <option>Germination</option><option>Vegetative</option><option>Flowering</option><option>Fruiting</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Soil Type</label>
                  <select className={selectClass} defaultValue="Loamy">
                    <option>Loamy</option><option>Sandy</option><option>Clay</option><option>Black Soil</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted mb-1 block">Weather</label>
                  <select className={selectClass} defaultValue="Partly Cloudy, 28°C">
                    <option>Partly Cloudy, 28°C</option><option>Sunny, 32°C</option><option>Rainy, 24°C</option>
                  </select>
                </div>
                {activeTab === 'pesticide' && (
                  <div>
                    <label className="text-xs font-medium text-muted mb-1 block">Visible Symptoms</label>
                    <textarea className={selectClass} rows={3} defaultValue="Yellow spots on leaves, wilting edges" />
                  </div>
                )}
                <Button onClick={() => setGenerated(true)} className="w-full" icon={FlaskConical}>
                  Get Recommendation
                </Button>
              </div>
            </Card>

            <div className="lg:col-span-2">
              {!generated ? (
                <Card className="flex items-center justify-center h-64 text-muted">
                  Fill in your farm details and click "Get Recommendation"
                </Card>
              ) : activeTab === 'fertilizer' ? (
                <div className="space-y-6">
                  <Card>
                    <h3 className="font-bold text-deep-green mb-4 flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-leaf" /> Recommended Fertilizer
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { name: 'Nitrogen (N)', dosage: '40 kg/hectare', color: 'bg-leaf-light/10' },
                        { name: 'Phosphorus (P)', dosage: '25 kg/hectare', color: 'bg-warm-yellow/10' },
                        { name: 'Potassium (K)', dosage: '30 kg/hectare', color: 'bg-beige' },
                      ].map(f => (
                        <div key={f.name} className={`${f.color} rounded-xl p-4 text-center`}>
                          <p className="font-bold text-deep-green">{f.name}</p>
                          <p className="text-sm text-muted mt-1">Recommended dosage:</p>
                          <p className="text-lg font-bold text-leaf mt-1">{f.dosage}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card>
                    <h3 className="font-bold text-deep-green mb-2">Why this recommendation?</h3>
                    <p className="text-sm text-muted">
                      Based on soybean at flowering stage on loamy soil with partly cloudy weather (28°C).
                      Nitrogen supports pod development, phosphorus aids root health, and potassium improves disease resistance.
                      Apply during early morning with adequate soil moisture.
                    </p>
                  </Card>
                </div>
              ) : (
                <div className="space-y-6">
                  <Card>
                    <h3 className="font-bold text-deep-green mb-4 flex items-center gap-2">
                      <Bug className="w-5 h-5 text-leaf" /> Pesticide Recommendation
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                        <div>
                          <p className="text-xs text-muted">Disease / Pest</p>
                          <p className="font-bold text-deep-green">Leaf Spot (Cercospora)</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">Risk: High</span>
                      </div>
                      <div className="p-4 bg-beige rounded-xl">
                        <p className="text-xs text-muted">Recommended Treatment</p>
                        <p className="font-bold text-deep-green mt-1">Mancozeb 75% WP (Fungicide category)</p>
                      </div>
                      <div className="p-4 bg-beige rounded-xl">
                        <p className="text-xs text-muted">Application (Demo)</p>
                        <p className="text-sm text-deep-green mt-1">Mix 2g per liter of water. Spray uniformly on both leaf surfaces. Repeat after 10–12 days if symptoms persist. Apply in evening hours.</p>
                      </div>
                    </div>
                  </Card>
                  <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                    <Shield className="w-6 h-6 text-red-600 shrink-0" />
                    <div>
                      <p className="font-bold text-red-800 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Safety Disclaimer
                      </p>
                      <p className="text-sm text-red-700 mt-1">
                        This is a simulated/demo recommendation only. Never apply pesticides based on demo data.
                        Always consult certified agricultural experts and follow local regulations. Wear protective equipment and observe pre-harvest intervals.
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
