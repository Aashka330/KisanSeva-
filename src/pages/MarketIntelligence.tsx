import { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Filter, ShieldCheck, Zap } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DemoBadge from '../components/ui/DemoBadge';
import { PriceLineChart, SupplyDemandChart, RegionalBarChart } from '../components/charts/Charts';
import { getMarketCommodityData, SYNTHETIC_MODEL_INFO } from '../lib/agriEngine';

const tabs = ['Crop Market', 'Plant Market', 'Tree/Wood Market', 'Import & Export'];
const commodities = ['Soybean', 'Wheat', 'Cotton', 'Rice', 'Sugarcane'];
const regions = ['All Regions', 'Maharashtra', 'Punjab', 'Karnataka', 'Gujarat', 'Madhya Pradesh'];
const periods = ['7 Days', '30 Days', '90 Days', '1 Year'];

export default function MarketIntelligence() {
  const [activeTab, setActiveTab] = useState(0);
  const [commodity, setCommodity] = useState('Soybean');
  const [region, setRegion] = useState('All Regions');
  const [period, setPeriod] = useState('30 Days');

  const selectClass = 'px-3 py-2 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-leaf-light/50';

  const marketData = getMarketCommodityData(commodity);
  const TrendIcon = marketData.sentiment === 'Bearish' ? TrendingDown : TrendingUp;

  // Filter regional prices if a specific region is chosen
  const filteredRegionalPrices = region === 'All Regions'
    ? marketData.regionalPrices
    : marketData.regionalPrices.filter(r => r.region.toLowerCase().includes(region.toLowerCase()));

  const displayRegionalPrices = filteredRegionalPrices.length > 0 ? filteredRegionalPrices : marketData.regionalPrices;

  return (
    <Layout>
      <div className="bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Market Intelligence' }]} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading">Market Intelligence</h1>
              <p className="mt-2 text-muted">Track prices, analyze trends, and make informed market decisions.</p>
            </div>
            <DemoBadge label="Synthetic estimates — not live mandi prices" />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === i ? 'bg-deep-green text-white' : 'bg-surface border border-border text-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 3 ? (
            <div className="text-center py-12">
              <p className="text-muted mb-4">View detailed import & export analytics</p>
              <Button to="/global-trade">Go to Global Agriculture Trade</Button>
            </div>
          ) : activeTab === 2 ? (
            <div className="text-center py-12">
              <p className="text-muted mb-4">View timber & wood market analytics</p>
              <Button to="/timber-market">Go to Timber & Wood Market</Button>
            </div>
          ) : (
            <>
              <Card className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-leaf" />
                  <span className="font-semibold text-deep-green">Filters</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <select value={commodity} onChange={e => setCommodity(e.target.value)} className={selectClass}>
                    {commodities.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <select value={region} onChange={e => setRegion(e.target.value)} className={selectClass}>
                    {regions.map(r => <option key={r}>{r}</option>)}
                  </select>
                  <select value={period} onChange={e => setPeriod(e.target.value)} className={selectClass}>
                    {periods.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </Card>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Current Price', value: `₹${marketData.currentPrice.toLocaleString()}`, sub: `/ ${marketData.unit}`, icon: BarChart3 },
                  { label: 'Govt MSP', value: `₹${marketData.msp.toLocaleString()}`, sub: 'Benchmark floor', icon: ShieldCheck },
                  { label: '30-Day Model Estimate', value: `₹${marketData.forecast30d.toLocaleString()}`, sub: 'Synthetic model · not a live quote', icon: Zap, positive: true },
                  { label: 'Market Sentiment', value: marketData.sentiment, sub: `Demand: ${marketData.demand} · Supply: ${marketData.supply}`, icon: TrendIcon, positive: marketData.sentiment !== 'Bearish' },
                ].map(kpi => (
                  <Card key={kpi.label}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted font-medium">{kpi.label}</p>
                      <kpi.icon className={`w-4 h-4 ${kpi.positive ? 'text-leaf' : 'text-muted'}`} />
                    </div>
                    <p className="text-2xl font-bold text-deep-green font-heading">{kpi.value}</p>
                    <p className="text-xs text-muted mt-1">{kpi.sub}</p>
                  </Card>
                ))}
              </div>

              <p className="text-xs text-muted mb-6">
                Forecast model trained on {SYNTHETIC_MODEL_INFO.marketTrainingExamples.toLocaleString()} generated market scenarios;
                all displayed observations are demo values, not a live mandi feed.
              </p>

              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-deep-green">Price History & Projection — {marketData.commodity}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${marketData.sentiment === 'Bearish' ? 'bg-red-50 text-red-600' : 'bg-leaf-light/20 text-leaf'}`}>
                      Trend: {marketData.sentiment}
                    </span>
                  </div>
                  <PriceLineChart data={marketData.priceHistory} dataKey="price" />
                </Card>
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-deep-green">Supply vs Demand Balance</h3>
                    <span className="text-xs text-muted">Index (0–100)</span>
                  </div>
                  <SupplyDemandChart data={marketData.supplyDemand} />
                </Card>
              </div>

              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-deep-green">Regional Mandi Prices ({commodity})</h3>
                  <span className="text-xs text-muted">Filter: {region}</span>
                </div>
                <RegionalBarChart data={displayRegionalPrices} />
              </Card>

              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <Card className="text-center">
                  <p className="text-xs text-muted">Demand</p>
                  <p className="text-xl font-bold text-leaf">{marketData.demand}</p>
                </Card>
                <Card className="text-center">
                  <p className="text-xs text-muted">Supply</p>
                  <p className="text-xl font-bold text-warm-yellow-dark">{marketData.supply}</p>
                </Card>
                <Card className="text-center">
                  <p className="text-xs text-muted">Trend</p>
                  <p className="text-xl font-bold text-deep-green flex items-center justify-center gap-1">
                    <TrendIcon className="w-5 h-5" />
                    {marketData.sentiment}
                  </p>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
