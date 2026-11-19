import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell,
} from 'recharts';

const COLORS = ['#1B4332', '#40916C', '#52B788', '#E9C46A', '#6B4423'];

interface ChartProps {
  data: Record<string, unknown>[];
  dataKey: string;
  xKey?: string;
  height?: number;
  color?: string;
}

export function PriceLineChart({ data, dataKey, xKey = 'date', height = 300, color = '#40916C' }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#64748B' }} />
        <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: '1px solid #E2E8E4', boxShadow: '0 4px 24px rgba(27,67,50,0.08)' }}
        />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ r: 4, fill: color }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SupplyDemandChart({ data, height = 300 }: { data: Record<string, unknown>[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
        <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8E4' }} />
        <Bar dataKey="supply" fill="#52B788" radius={[4, 4, 0, 0]} name="Supply" />
        <Bar dataKey="demand" fill="#1B4332" radius={[4, 4, 0, 0]} name="Demand" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AreaTrendChart({ data, dataKey, xKey = 'month', height = 250, color = '#40916C' }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: '#64748B' }} />
        <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8E4' }} />
        <Area type="monotone" dataKey={dataKey} stroke={color} fill="url(#colorGradient)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function EnvironmentalRadar({ data, height = 300 }: { data: { subject: string; value: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data}>
        <PolarGrid stroke="#E2E8E4" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748B' }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748B' }} />
        <Radar dataKey="value" stroke="#40916C" fill="#52B788" fillOpacity={0.4} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({ data, height = 200 }: { data: { name: string; value: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8E4' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function GaugeChart({ value, max = 100, label }: { value: number; max?: number; label: string }) {
  const pct = (value / max) * 100;
  const color = pct >= 70 ? '#52B788' : pct >= 40 ? '#E9C46A' : '#ef4444';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20 overflow-hidden">
        <div
          className="absolute inset-0 rounded-t-full"
          style={{
            background: `conic-gradient(from 180deg, ${color} ${pct * 1.8}deg, #E2E8E4 ${pct * 1.8}deg)`,
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-surface rounded-t-full flex items-end justify-center pb-2">
          <span className="text-2xl font-bold text-deep-green font-heading">{value}</span>
        </div>
      </div>
      <span className="text-sm text-muted mt-2">{label}</span>
    </div>
  );
}

export function RegionalBarChart({ data, height = 280 }: { data: { region: string; price: number }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8E4" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: '#64748B' }} />
        <YAxis dataKey="region" type="category" tick={{ fontSize: 11, fill: '#64748B' }} width={140} />
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8E4' }} />
        <Bar dataKey="price" fill="#40916C" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export { COLORS };
