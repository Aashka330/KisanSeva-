import { Thermometer, TrendingUp, Leaf, BarChart3, Wind } from 'lucide-react';
import DashboardSidebar from '../components/dashboard/Sidebar';
import Card from '../components/ui/Card';
import DemoBadge from '../components/ui/DemoBadge';
import { AreaTrendChart, PriceLineChart } from '../components/charts/Charts';
import { dashboardData, marketData } from '../data/synthetic';

export default function Dashboard() {
  const kpis = [
    { label: 'Farm Area', value: dashboardData.farmArea, icon: Leaf },
    { label: 'Current Crop', value: dashboardData.currentCrop, icon: Leaf },
    { label: 'Crop Health', value: `${dashboardData.cropHealth}%`, icon: TrendingUp },
    { label: 'Weather', value: `${dashboardData.weather.temp}°C`, sub: dashboardData.weather.condition, icon: Thermometer },
    { label: 'AQI', value: dashboardData.aqi.toString(), icon: Wind },
    { label: 'Market Value', value: dashboardData.marketValue, icon: BarChart3 },
    { label: 'Expected Revenue', value: dashboardData.expectedRevenue, icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen flex bg-beige">
      <DashboardSidebar />
      <main className="flex-1 p-6 lg:p-8 pt-16 lg:pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-deep-green font-heading">KisanSeva Dashboard</h1>
            <p className="text-sm text-muted mt-1">Welcome back, Farmer! Here's your farm overview.</p>
          </div>
          <DemoBadge />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map(kpi => (
            <Card key={kpi.label}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted font-medium">{kpi.label}</p>
                <kpi.icon className="w-4 h-4 text-leaf" />
              </div>
              <p className="text-xl font-bold text-deep-green font-heading">{kpi.value}</p>
              {'sub' in kpi && kpi.sub && <p className="text-xs text-muted mt-0.5">{kpi.sub}</p>}
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="font-bold text-deep-green mb-4">Crop Performance</h3>
            <AreaTrendChart data={dashboardData.performance} dataKey="yield" xKey="month" />
          </Card>
          <Card>
            <h3 className="font-bold text-deep-green mb-4">Revenue Trend</h3>
            <AreaTrendChart data={dashboardData.performance} dataKey="revenue" xKey="month" color="#E9C46A" />
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-bold text-deep-green mb-4">Market Prices — Soybean</h3>
            <PriceLineChart data={marketData.priceHistory} dataKey="price" height={250} />
          </Card>
          <Card>
            <h3 className="font-bold text-deep-green mb-4">Environmental Impact Score</h3>
            <div className="flex items-center justify-center h-[250px]">
              <div className="text-center">
                <div className="text-6xl font-bold text-leaf font-heading">78</div>
                <p className="text-muted mt-2">Environmental Score / 100</p>
                <p className="text-sm text-leaf mt-1">Positive impact from current crop selection</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
