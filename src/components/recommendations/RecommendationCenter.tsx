import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Droplets, Target, Calendar, Ruler, Navigation,
  ChevronRight, Leaf, AlertTriangle, CheckCircle,
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import DemoBadge from '../ui/DemoBadge';
import Modal from '../ui/Modal';
import {
  states, districts, soilTypes, waterLevels, seasons, goals,
  cropRecommendations, plantRecommendations, treeRecommendations,
  type Recommendation,
} from '../../data/synthetic';

type Tab = 'crops' | 'plants' | 'trees';

const tabData: Record<Tab, Recommendation[]> = {
  crops: cropRecommendations,
  plants: plantRecommendations,
  trees: treeRecommendations,
};

const riskColors = { Low: 'text-leaf bg-leaf-light/20', Medium: 'text-warm-yellow-dark bg-warm-yellow/20', High: 'text-red-600 bg-red-50' };
const envColors = { Positive: 'text-leaf', Neutral: 'text-muted', Negative: 'text-red-600' };

export default function RecommendationCenter() {
  const [tab, setTab] = useState<Tab>('crops');
  const [state, setState] = useState('Maharashtra');
  const [district, setDistrict] = useState('Pune');
  const [soil, setSoil] = useState('Loamy');
  const [water, setWater] = useState('Medium');
  const [season, setSeason] = useState('Kharif');
  const [goal, setGoal] = useState('Maximum Profit');
  const [area, setArea] = useState('5');
  const [areaUnit, setAreaUnit] = useState('acres');
  const [modalItem, setModalItem] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const selectClass = 'w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-leaf-light/50';

  return (
    <section className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <DemoBadge className="mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">
            AI Recommendation Center
          </h2>
          <p className="mt-3 text-muted text-lg max-w-2xl mx-auto">
            Tell us about your land and goals — our AI engine will recommend the best crops, plants, and trees.
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
                <select value={state} onChange={e => { setState(e.target.value); setDistrict(districts[e.target.value]?.[0] ?? ''); }} className={selectClass}>
                  {states.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">District</label>
                <select value={district} onChange={e => setDistrict(e.target.value)} className={selectClass}>
                  {(districts[state] ?? []).map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">City / Village</label>
                <input type="text" placeholder="Enter location" defaultValue="Shivaji Nagar" className={selectClass} />
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-leaf text-leaf text-sm font-medium hover:bg-leaf-light/10 transition-colors">
                <Navigation className="w-4 h-4" /> Use GPS Location
              </button>
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">Soil Type</label>
                <select value={soil} onChange={e => setSoil(e.target.value)} className={selectClass}>
                  {soilTypes.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs font-medium text-muted mb-1 block">Land Area</label>
                  <input type="number" value={area} onChange={e => setArea(e.target.value)} className={selectClass} />
                </div>
                <div className="w-28">
                  <label className="text-xs font-medium text-muted mb-1 block">Unit</label>
                  <select value={areaUnit} onChange={e => setAreaUnit(e.target.value)} className={selectClass}>
                    <option>acres</option>
                    <option>hectares</option>
                  </select>
                </div>
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
              <div>
                <label className="text-xs font-medium text-muted mb-1 block">Goal</label>
                <select value={goal} onChange={e => setGoal(e.target.value)} className={selectClass}>
                  {goals.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <Button onClick={handleGenerate} className="w-full" icon={Target}>
                Generate Recommendations
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
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {tabData[tab].map((rec, i) => (
                  <motion.div
                    key={rec.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card hover className="h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs text-muted font-medium">Recommendation</p>
                          <h4 className="text-xl font-bold text-deep-green font-heading">{rec.name}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted">Suitability</p>
                          <p className="text-2xl font-bold text-leaf">{rec.suitability}%</p>
                        </div>
                      </div>

                      <div className="w-full bg-beige rounded-full h-2 mb-4">
                        <div className="bg-leaf-light h-2 rounded-full transition-all" style={{ width: `${rec.suitability}%` }} />
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-muted" />
                          <span className="text-muted">Yield: <strong className="text-deep-green">{rec.yield}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-muted" />
                          <span className="text-muted">Revenue: <strong className="text-deep-green">{rec.revenue}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-muted" />
                          <span className="text-muted">Water: <strong>{rec.water}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted" />
                          <span className="text-muted">{rec.period}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${riskColors[rec.risk]}`}>
                          Risk: {rec.risk}
                        </span>
                        <span className={`text-xs font-medium flex items-center gap-1 ${envColors[rec.environmental]}`}>
                          <Leaf className="w-3.5 h-3.5" /> {rec.environmental}
                        </span>
                      </div>

                      <button
                        onClick={() => setModalItem(rec)}
                        className="mt-4 w-full flex items-center justify-center gap-1 text-sm font-semibold text-leaf hover:text-deep-green transition-colors"
                      >
                        View Detailed Analysis <ChevronRight className="w-4 h-4" />
                      </button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal open={!!modalItem} onClose={() => setModalItem(null)} title={`${modalItem?.name} — Detailed Analysis`}>
        {modalItem && (
          <div className="space-y-4">
            <DemoBadge />
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Suitability', value: `${modalItem.suitability}%`, icon: CheckCircle },
                { label: 'Expected Yield', value: modalItem.yield, icon: Ruler },
                { label: 'Expected Revenue', value: modalItem.revenue, icon: Target },
                { label: 'Water Requirement', value: modalItem.water, icon: Droplets },
                { label: 'Growing Period', value: modalItem.period, icon: Calendar },
                { label: 'Risk Level', value: modalItem.risk, icon: AlertTriangle },
              ].map(item => (
                <div key={item.label} className="bg-beige rounded-xl p-3">
                  <p className="text-xs text-muted">{item.label}</p>
                  <p className="font-bold text-deep-green">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted">
              Based on {soil} soil, {water.toLowerCase()} water availability, and {season} season in {district}, {state}.
              Environmental impact: <strong className={envColors[modalItem.environmental]}>{modalItem.environmental}</strong>.
            </p>
            <Button to="/environmental-impact" className="w-full">View Environmental Impact</Button>
          </div>
        )}
      </Modal>
    </section>
  );
}
