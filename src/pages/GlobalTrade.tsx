import { useState } from 'react';
import { Globe, TrendingUp, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/ui/Card';
import DemoBadge from '../components/ui/DemoBadge';
import { tradeData } from '../data/synthetic';

const commodities = ['Mango', 'Basmati Rice', 'Turmeric', 'Tea', 'Cotton'];
const compareMarkets = [
  { from: 'India', to: 'UAE', growth: 12.5 },
  { from: 'India', to: 'USA', growth: 8.2 },
  { from: 'India', to: 'UK', growth: 6.8 },
];

export default function GlobalTrade() {
  const [commodity, setCommodity] = useState('Mango');
  const [compareMode, setCompareMode] = useState(false);

  return (
    <Layout>
      <div className="bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Market Intelligence', to: '/market-intelligence' }, { label: 'Global Agriculture Trade' }]} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">Global Agriculture Trade</h1>
              <p className="mt-2 text-muted">Explore export markets, trade volumes, and growth opportunities.</p>
            </div>
            <DemoBadge />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {commodities.map(c => (
              <button
                key={c}
                onClick={() => setCommodity(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${commodity === c ? 'bg-deep-green text-white' : 'bg-surface border border-border text-muted'}`}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCompareMode(!compareMode)}
            className="mb-6 text-sm font-semibold text-leaf hover:text-deep-green transition-colors"
          >
            {compareMode ? '← Back to Market View' : 'Compare Markets →'}
          </button>

          {compareMode ? (
            <div className="grid md:grid-cols-3 gap-6">
              {compareMarkets.map(m => (
                <Card key={m.to} hover>
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-leaf" />
                    <span className="font-bold text-deep-green">{m.from} → {m.to}</span>
                  </div>
                  <div className="text-3xl font-bold text-leaf font-heading">+{m.growth}%</div>
                  <p className="text-sm text-muted mt-1">Growth rate (YoY)</p>
                  <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted">Export Volume</span><span className="font-medium">{(Math.random() * 50 + 5).toFixed(1)}K MT</span></div>
                    <div className="flex justify-between"><span className="text-muted">Avg Price</span><span className="font-medium">₹{(Math.random() * 100 + 50).toFixed(0)}/kg</span></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {/* World map placeholder */}
              <Card className="mb-8 bg-gradient-to-br from-deep-green/5 to-leaf/5">
                <div className="flex items-center justify-center h-48 relative">
                  <Globe className="w-32 h-32 text-leaf/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-deep-green font-semibold">Export Destinations for {commodity}</p>
                  </div>
                  {tradeData.exportMarkets.slice(0, 5).map((m, i) => (
                    <div
                      key={m.country}
                      className="absolute bg-surface rounded-lg px-3 py-1.5 shadow-soft text-xs font-medium text-deep-green border border-border"
                      style={{
                        top: `${20 + i * 12}%`,
                        left: `${15 + (i % 3) * 25}%`,
                      }}
                    >
                      {m.country} <ArrowRight className="w-3 h-3 inline text-leaf" />
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tradeData.exportMarkets.map(m => (
                  <Card key={m.country} hover>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-deep-green text-lg">{m.country}</h3>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-leaf-light/20 text-leaf">{m.demand} Demand</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><p className="text-xs text-muted">Volume</p><p className="font-semibold">{m.volume}</p></div>
                      <div><p className="text-xs text-muted">Value</p><p className="font-semibold">{m.value}</p></div>
                      <div><p className="text-xs text-muted">Avg Price</p><p className="font-semibold">{m.avgPrice}</p></div>
                      <div><p className="text-xs text-muted">Growth</p><p className="font-semibold text-leaf flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />+{m.growth}%</p></div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
