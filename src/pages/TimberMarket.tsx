import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/ui/Card';
import DemoBadge from '../components/ui/DemoBadge';
import { AreaTrendChart } from '../components/charts/Charts';
import { timberData } from '../data/synthetic';
import { TrendingUp, BarChart3, ArrowDown } from 'lucide-react';

const woodTypes = ['Teak', 'Sal', 'Sheesham', 'Eucalyptus', 'Pine'];

export default function TimberMarket() {
  return (
    <Layout>
      <div className="bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Market Intelligence', to: '/market-intelligence' }, { label: 'Timber & Wood Market' }]} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">Timber & Wood Market</h1>
              <p className="mt-2 text-muted">Specialized market intelligence for wood vendors and timber traders.</p>
            </div>
            <DemoBadge label="Price predictions use synthetic/demo data" />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {woodTypes.map(w => (
              <button key={w} className={`px-4 py-2 rounded-full text-sm font-medium ${w === 'Teak' ? 'bg-deep-green text-white' : 'bg-surface border border-border text-muted'}`}>
                {w}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Current Price', value: `₹${timberData.currentPrice.toLocaleString()}`, sub: `/ ${timberData.unit}` },
              { label: 'Demand Index', value: `${timberData.demandIndex}/100`, sub: 'Strong demand' },
              { label: 'Supply Index', value: `${timberData.supplyIndex}/100`, sub: 'Moderate supply' },
              { label: '30-Day Prediction', value: `₹${timberData.predictedPrice.toLocaleString()}`, sub: `${timberData.confidence}% confidence` },
            ].map(kpi => (
              <Card key={kpi.label}>
                <p className="text-xs text-muted font-medium">{kpi.label}</p>
                <p className="text-2xl font-bold text-deep-green font-heading mt-1">{kpi.value}</p>
                <p className="text-xs text-muted mt-1">{kpi.sub}</p>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <h3 className="font-bold text-deep-green mb-4">Historical Price — Teak</h3>
              <AreaTrendChart data={timberData.priceHistory} dataKey="price" />
            </Card>

            <Card>
              <h3 className="font-bold text-deep-green mb-4">AI Price Prediction Model</h3>
              <div className="space-y-4">
                {[
                  { step: 'Historical Data', desc: '7 months of price trends analyzed', icon: BarChart3 },
                  { step: 'Market Factors', desc: 'Demand, supply, seasonality, export trends', icon: TrendingUp },
                  { step: 'Prediction Model', desc: 'ML ensemble with 87% accuracy', icon: BarChart3 },
                  { step: 'Future Price', desc: `₹${timberData.predictedPrice.toLocaleString()} in 30 days`, icon: TrendingUp },
                ].map((s, i) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-beige flex items-center justify-center shrink-0">
                      <s.icon className="w-5 h-5 text-leaf" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-deep-green text-sm">{s.step}</p>
                      <p className="text-xs text-muted">{s.desc}</p>
                    </div>
                    {i < 3 && <ArrowDown className="w-4 h-4 text-muted mt-3 hidden sm:block" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-leaf-light/10 rounded-xl text-center">
                <p className="text-sm text-muted">Prediction Confidence</p>
                <p className="text-3xl font-bold text-leaf font-heading">{timberData.confidence}%</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
