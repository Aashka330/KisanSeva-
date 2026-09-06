import { motion } from 'framer-motion';
import {
  Cloud, Droplets, Wind, TrendingUp, Sparkles, Thermometer,
  BarChart3, ArrowUpRight,
} from 'lucide-react';

const metrics = [
  { icon: Thermometer, label: '28°C', sub: 'Temp' },
  { icon: Droplets, label: '72%', sub: 'Humidity' },
  { icon: TrendingUp, label: '₹4,850', sub: 'Soybean' },
  { icon: Sparkles, label: '92%', sub: 'AI Match' },
];

const bars = [35, 52, 44, 68, 58, 82, 74, 88, 79, 95];

export default function HeroDashboard() {
  return (
    <div className="relative w-full">
      {/* Main glass card */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glass-white rounded-3xl p-6 shadow-hover border border-white/50"
        style={{ perspective: 1000 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-leaf to-deep-green flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-deep-green">Live Farm Dashboard</p>
              <p className="text-[11px] text-muted">Pune, Maharashtra</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-leaf-light/15 border border-leaf-light/30">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-leaf"
            />
            <span className="text-[11px] font-semibold text-leaf">Live</span>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Crop Health', val: '87%', grad: 'from-leaf-light/20 to-leaf/10', color: 'text-leaf' },
            { label: 'Soil Moisture', val: '45%', grad: 'from-warm-yellow/20 to-warm-yellow/5', color: 'text-warm-yellow-dark' },
            { label: 'Market', val: '+8.7%', grad: 'from-deep-green/10 to-leaf/5', color: 'text-deep-green' },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className={`bg-gradient-to-br ${kpi.grad} rounded-2xl p-3.5 text-center border border-border/50`}
            >
              <p className={`text-2xl font-extrabold font-heading ${kpi.color}`}>{kpi.val}</p>
              <p className="text-[10px] text-muted font-medium mt-0.5">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-beige/60 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-deep-green">Yield Forecast</span>
            <span className="text-xs text-leaf font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +12.4%
            </span>
          </div>
          <div className="h-20 flex items-end gap-1.5">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.9 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-leaf to-leaf-light origin-bottom"
              />
            ))}
          </div>
        </div>

        {/* Mini metrics strip */}
        <div className="grid grid-cols-4 gap-2">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.sub}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.08 }}
                className="flex flex-col items-center gap-1 p-2 rounded-xl bg-surface/60 border border-border/40"
              >
                <Icon className="w-3.5 h-3.5 text-leaf" />
                <p className="text-xs font-bold text-deep-green">{m.label}</p>
                <p className="text-[9px] text-muted">{m.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Floating pills */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-2.5 hidden sm:flex items-center gap-2 shadow-glow"
      >
        <Cloud className="w-4 h-4 text-leaf-pale" />
        <div>
          <p className="text-xs font-bold text-white">AQI 68</p>
          <p className="text-[10px] text-white/60">Moderate</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-3 -left-3 glass rounded-2xl px-4 py-2.5 hidden sm:flex items-center gap-2"
      >
        <Wind className="w-4 h-4 text-leaf-pale" />
        <div>
          <p className="text-xs font-bold text-white">14 km/h</p>
          <p className="text-[10px] text-white/60">Wind</p>
        </div>
      </motion.div>
    </div>
  );
}
