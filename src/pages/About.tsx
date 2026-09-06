import { motion } from 'framer-motion';
import { Target, Leaf, Cpu, Globe, Shield, Database } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const principles = [
  { icon: Target, title: 'Smart Decisions', desc: 'AI-powered recommendations help you choose the right crops, plants, and trees for maximum yield and sustainability.' },
  { icon: Leaf, title: 'Sustainable Growth', desc: 'Environmental impact analysis ensures your farming choices contribute to a greener, healthier planet.' },
  { icon: Cpu, title: 'Accessible Technology', desc: 'Complex agricultural intelligence made simple — designed for farmers, enthusiasts, and businesses alike.' },
];

const sections = [
  { icon: Globe, title: 'Mission', content: 'To democratize agricultural intelligence by making AI-powered farming tools accessible to every farmer, plant enthusiast, and agricultural business in India and beyond.' },
  { icon: Target, title: 'Vision', content: 'A world where every farming decision is informed by data, every crop choice considers environmental impact, and technology empowers rather than intimidates.' },
  { icon: Cpu, title: 'Technology', content: 'KisanSeva leverages machine learning, environmental modeling, market analytics, and weather intelligence to deliver actionable insights in real-time.' },
  { icon: Database, title: 'Data Intelligence', content: 'Our platform synthesizes data from soil profiles, weather patterns, market trends, and environmental models to provide comprehensive recommendations.' },
  { icon: Shield, title: 'Environmental Responsibility', content: 'We believe technology and nature can work together. Every recommendation considers environmental impact, carbon sequestration, and biodiversity.' },
];

export default function About() {
  return (
    <Layout>
      <div className="bg-beige">
        {/* Hero */}
        <section className="bg-gradient-to-br from-deep-green to-deep-green-light text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold font-heading"
            >
              About KisanSeva
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-leaf-pale/80 leading-relaxed max-w-2xl mx-auto"
            >
              KisanSeva is designed to make agricultural intelligence accessible to everyone —
              from small-scale farmers to large agribusinesses, plant enthusiasts to wood vendors.
            </motion.p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'About' }]} />
        </div>

        {/* Principles */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="text-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-beige flex items-center justify-center mx-auto mb-5">
                    <p.icon className="w-7 h-7 text-leaf" />
                  </div>
                  <h3 className="text-xl font-bold text-deep-green font-heading mb-3">{p.title}</h3>
                  <p className="text-muted leading-relaxed">{p.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-beige flex items-center justify-center shrink-0">
                      <s.icon className="w-6 h-6 text-leaf" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-deep-green font-heading mb-2">{s.title}</h3>
                      <p className="text-muted leading-relaxed">{s.content}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-deep-green font-heading mb-4">Ready to get started?</h2>
            <Button to="/auth?mode=signup" size="lg">Join KisanSeva Today</Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
