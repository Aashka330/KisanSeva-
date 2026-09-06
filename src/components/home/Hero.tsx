import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import HeroDashboard from './HeroDashboard';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '20%']);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Full-bleed background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <img
          src="/images/hero-farm.jpg"
          alt="Green farmland at sunrise"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-green via-transparent to-deep-green/30" />

      {/* Decorative rings */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-white/5 animate-float pointer-events-none hidden lg:block" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full border border-leaf-pale/10 pointer-events-none hidden lg:block" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative flex-1 flex items-center pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/90 text-sm font-semibold mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-leaf-light animate-pulse" />
                AI-Powered Agricultural Intelligence
              </motion.div>

              <h1 className="text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-extrabold font-heading leading-[1.05] tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-white"
                >
                  Grow Smarter.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-white"
                >
                  Farm Better.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block gradient-text animate-shimmer"
                >
                  Build a Greener Future.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-7 text-lg text-white/75 leading-relaxed max-w-lg"
              >
                AI crop recommendations, environmental intelligence, market analytics,
                and weather insights — all in one platform built for Indian agriculture.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button to="/recommendations" size="lg" className="shadow-glow">
                    Explore Recommendations
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/farming-assistant"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full glass text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    Try AI Assistant
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right — dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-6 bg-leaf-light/20 rounded-[2.5rem] blur-3xl" />
              <HeroDashboard />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats bar — overlaps bottom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-10 -mb-16 mx-4 sm:mx-6 lg:mx-auto max-w-5xl"
      >
        <div className="glass-white rounded-2xl shadow-hover border border-white/60 px-6 py-5 sm:px-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {[
            { val: 10000, suffix: '+', label: 'Active Farmers' },
            { val: 500, suffix: '+', label: 'Crops Analyzed' },
            { val: 28, suffix: '', label: 'States Covered' },
            { val: 92, suffix: '%', label: 'AI Accuracy' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-deep-green font-heading">
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </p>
              <p className="text-xs sm:text-sm text-muted font-medium mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hidden sm:flex"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}

const quickActions = [
  {
    title: 'Crop Recommendation',
    desc: 'Find the right crop for your land, soil, and season.',
    to: '/recommendations?tab=crops',
    image: '/images/crop.jpg',
    span: 'lg:col-span-2 lg:row-span-2',
    tall: true,
  },
  {
    title: 'Plant Recommendation',
    desc: 'Plants suited to your climate.',
    to: '/recommendations?tab=plants',
    image: '/images/plant.jpg',
    span: '',
    tall: false,
  },
  {
    title: 'Tree Recommendation',
    desc: 'Trees for climate & environment.',
    to: '/recommendations?tab=trees',
    image: '/images/forest.jpg',
    span: '',
    tall: false,
  },
  {
    title: 'Market Intelligence',
    desc: 'Track prices & predict trends.',
    to: '/market-intelligence',
    image: '/images/market.jpg',
    span: 'lg:col-span-2',
    tall: false,
  },
];

export function QuickActions() {
  return (
    <section className="pt-28 pb-24 mesh-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-leaf-light/15 text-leaf text-sm font-semibold mb-4">
            Get Started in Seconds
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-deep-green font-heading">
            What would you like to do?
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Pick a tool and get AI-powered insights instantly.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-5 auto-rows-[200px]">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={action.span}
            >
              <Link to={action.to} className="block group h-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-3xl overflow-hidden h-full min-h-[200px] shadow-card group-hover:shadow-hover transition-shadow duration-500 ${
                    action.tall ? 'lg:min-h-[420px]' : ''
                  }`}
                >
                  <img
                    src={action.image}
                    alt={action.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-green/90 via-deep-green/30 to-transparent" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className={`font-bold font-heading text-white leading-tight ${
                      action.tall ? 'text-2xl sm:text-3xl' : 'text-xl'
                    }`}>
                      {action.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/75 max-w-xs">{action.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-warm-yellow opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LiveTicker() {
  const items = [
    'Soybean ₹4,850/qt ↑4.2%',
    'Pune 28°C · Humidity 72%',
    'AI Match: Soybean 92%',
    'Market sentiment: Positive',
    'AQI 68 · Moderate',
    'Soil moisture 45%',
    'Wheat Rabi window open',
    'Teak ₹45,000/m³',
  ];

  return (
    <div className="relative z-20 bg-deep-green py-3.5 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-deep-green to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-deep-green to-transparent z-10" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap gap-16"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm font-medium text-leaf-pale/90 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-leaf-light" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
