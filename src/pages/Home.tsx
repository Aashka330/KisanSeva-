import { motion } from 'framer-motion';
import { Shield, Zap, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Hero, { QuickActions, LiveTicker } from '../components/home/Hero';
import PlatformShowcase from '../components/home/PlatformShowcase';
import RecommendationCenter from '../components/recommendations/RecommendationCenter';
import Button from '../components/ui/Button';
import { FadeInUp } from '../components/ui/AnimatedCounter';

const features = [
  {
    icon: Zap,
    title: 'AI Recommendations',
    desc: 'Intelligent crop, plant, and tree suggestions tailored to your land, soil, and climate.',
    points: ['92% suitability scoring', 'Multi-season planning', 'Goal-based filtering'],
  },
  {
    icon: Globe,
    title: 'Environmental Intelligence',
    desc: 'Understand the environmental impact of your farming choices with detailed analytics.',
    points: ['AQI impact analysis', 'Carbon sequestration', 'Biodiversity scoring'],
  },
  {
    icon: Shield,
    title: 'Market Intelligence',
    desc: 'Track prices, predict trends, and make informed selling decisions with market data.',
    points: ['Price history charts', 'Regional comparisons', 'AI price predictions'],
  },
];

export default function Home() {
  return (
    <Layout>
      <Hero />
      <LiveTicker />
      <QuickActions />
      <PlatformShowcase />
      <RecommendationCenter />

      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1500595046743-be6804f07029?w=1600&q=60&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-surface/92" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <span className="text-sm font-semibold text-leaf uppercase tracking-wider">Why KisanSeva</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-deep-green font-heading">
              Everything You Need to Farm Smarter
            </h2>
            <p className="mt-3 text-muted text-lg max-w-2xl mx-auto">
              From seed selection to market selling — KisanSeva covers every step of your agricultural journey.
            </p>
          </FadeInUp>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <FadeInUp key={f.title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-surface rounded-2xl border border-border p-8 shadow-soft hover:shadow-hover h-full"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-leaf-light/20 to-leaf/10 flex items-center justify-center mb-6"
                  >
                    <f.icon className="w-7 h-7 text-leaf" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-deep-green font-heading mb-3">{f.title}</h3>
                  <p className="text-muted leading-relaxed mb-5">{f.desc}</p>
                  <ul className="space-y-2">
                    {f.points.map(point => (
                      <li key={point} className="flex items-center gap-2 text-sm text-deep-green/80">
                        <CheckCircle2 className="w-4 h-4 text-leaf shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-deep-green/88" />

        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute w-2 h-2 rounded-full bg-leaf-pale/40"
            style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
          />
        ))}

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <FadeInUp>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading leading-tight">
              Ready to Transform Your Farming?
            </h2>
            <p className="mt-5 text-leaf-pale/85 text-lg max-w-xl mx-auto">
              Join thousands of farmers making smarter decisions with KisanSeva's AI-powered platform.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button to="/auth?mode=signup" variant="secondary" size="lg">
                  Get Started Free
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  to="/farming-assistant"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-deep-green"
                >
                  Try AI Assistant <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
}
