import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, BarChart3, Leaf, Bot } from 'lucide-react';
import { FadeInUp } from '../ui/AnimatedCounter';

const showcases = [
  {
    title: 'Weather Intelligence',
    desc: 'Forecasts, AQI, soil moisture & crop advisories.',
    to: '/weather',
    image: '/images/sky.jpg',
    icon: Cloud,
    stat: '7-day forecast',
  },
  {
    title: 'Market Analytics',
    desc: 'Prices, supply vs demand & AI predictions.',
    to: '/market-intelligence',
    image: '/images/farmer1.jpeg',
    icon: BarChart3,
    stat: '247 commodities',
  },
  {
    title: 'Environmental Impact',
    desc: 'Carbon, AQI improvement & biodiversity.',
    to: '/environmental-impact',
    image: '/images/plant1.jpg',
    icon: Leaf,
    stat: '92/100 score',
  },
  {
    title: 'AI Farming Assistant',
    desc: 'Ask anything about crops, pests & markets.',
    to: '/farming-assistant',
    image: '/images/farmer1.jpg',
    icon: Bot,
    stat: '24/7 available',
  },
];

export default function PlatformShowcase() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp className="mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-sm font-semibold text-leaf uppercase tracking-widest">Platform</span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold text-deep-green font-heading leading-tight">
                Intelligence at<br className="hidden sm:block" /> every step
              </h2>
            </div>
            <p className="text-muted text-lg max-w-sm lg:text-right">
              Weather, markets, environment, and AI — unified for smarter farming decisions.
            </p>
          </div>
        </FadeInUp>

        <div className="grid sm:grid-cols-2 gap-5">
          {showcases.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeInUp key={item.title} delay={i * 0.08}>
                <Link to={item.to} className="group block">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="relative rounded-3xl overflow-hidden h-[240px] sm:h-[280px] shadow-card group-hover:shadow-hover transition-shadow duration-500"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-deep-green/95 via-deep-green/60 to-deep-green/20" />

                    <div className="absolute inset-0 p-7 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center">
                          <Icon className="w-5 h-5 text-leaf-pale" />
                        </div>
                        <span className="text-xs font-bold text-warm-yellow glass px-3 py-1.5 rounded-full">
                          {item.stat}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white font-heading">{item.title}</h3>
                        <p className="mt-1.5 text-sm text-white/70">{item.desc}</p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-warm-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeInUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
