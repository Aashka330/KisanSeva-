import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Wind, TreePine, ArrowDown, ArrowUp } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/ui/Card';
import DemoBadge from '../components/ui/DemoBadge';
import { EnvironmentalRadar, GaugeChart } from '../components/charts/Charts';
import { environmentalData } from '../data/synthetic';

const items = Object.keys(environmentalData);

export default function EnvironmentalImpact() {
  const [selected, setSelected] = useState('Neem Tree');
  const data = environmentalData[selected as keyof typeof environmentalData];

  return (
    <Layout>
      <div className="bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Environmental Impact' }]} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">Environmental Impact</h1>
              <p className="mt-2 text-muted">Analyze the environmental benefits of crops, plants, and trees.</p>
            </div>
            <DemoBadge label="Synthetic / Estimated Data" />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {items.map(item => (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selected === item ? 'bg-deep-green text-white' : 'bg-surface border border-border text-muted hover:border-leaf'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1 flex flex-col items-center justify-center">
              <GaugeChart value={data.score} label="Environmental Score" />
              <p className="mt-4 text-center text-sm text-muted">
                AQI Impact: <strong className="text-leaf">{data.aqiImpact}</strong>
              </p>
            </Card>

            <Card className="lg:col-span-2">
              <h3 className="font-bold text-deep-green mb-4">Environmental Profile</h3>
              <EnvironmentalRadar data={data.radar} />
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <h3 className="font-bold text-deep-green mb-4 flex items-center gap-2">
                <Wind className="w-5 h-5 text-leaf" /> Pollutant Impact
              </h3>
              <div className="space-y-3">
                {data.pollutants.map(p => (
                  <div key={p.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-deep-green">{p.name}</span>
                    <div className="flex items-center gap-2">
                      {p.change < 0 ? (
                        <ArrowDown className="w-4 h-4 text-leaf" />
                      ) : (
                        <ArrowUp className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-bold ${p.change < 0 ? 'text-leaf' : 'text-red-500'}`}>
                        {Math.abs(p.change)}{p.unit ? ` ${p.unit}` : '%'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-deep-green mb-4 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-leaf" /> Key Metrics
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Carbon Sequestration', value: data.carbonSequestration, icon: TreePine },
                  { label: 'Water Requirement', value: data.waterRequirement, icon: Droplets },
                  { label: 'Oxygen Contribution', value: data.oxygenContribution, icon: Wind },
                  { label: 'Biodiversity Impact', value: data.biodiversity, icon: Leaf },
                  { label: 'Soil Impact', value: data.soilImpact, icon: Leaf },
                ].map(m => (
                  <div key={m.label} className="flex items-start gap-3 p-3 bg-beige rounded-xl">
                    <m.icon className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted">{m.label}</p>
                      <p className="text-sm font-medium text-deep-green">{m.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Before/After comparison */}
          <Card>
            <h3 className="font-bold text-deep-green mb-6">Before / After Comparison</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-2xl p-6 text-center">
                <p className="text-sm font-medium text-red-600 mb-2">Before Planting</p>
                <div className="text-4xl font-bold text-red-500 font-heading">AQI 78</div>
                <p className="text-sm text-muted mt-2">Moderate pollution levels</p>
                <div className="mt-4 space-y-2 text-sm text-left">
                  <div className="flex justify-between"><span>PM2.5</span><span className="font-medium">45 µg/m³</span></div>
                  <div className="flex justify-between"><span>CO₂</span><span className="font-medium">420 ppm</span></div>
                </div>
              </div>
              <div className="bg-leaf-light/10 rounded-2xl p-6 text-center">
                <p className="text-sm font-medium text-leaf mb-2">After Planting (Estimated)</p>
                <div className="text-4xl font-bold text-leaf font-heading">AQI 62</div>
                <p className="text-sm text-muted mt-2">Improved air quality</p>
                <div className="mt-4 space-y-2 text-sm text-left">
                  <div className="flex justify-between"><span>PM2.5</span><span className="font-medium text-leaf">41 µg/m³ ↓</span></div>
                  <div className="flex justify-between"><span>CO₂</span><span className="font-medium text-leaf">408 ppm ↓</span></div>
                </div>
              </div>
            </div>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 p-4 bg-warm-yellow/10 border border-warm-yellow/30 rounded-xl text-sm text-earth"
          >
            Based on synthetic environmental data, planting <strong>{selected}</strong> may contribute to improved local air quality and carbon absorption. All calculations are estimated for demonstration purposes.
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
