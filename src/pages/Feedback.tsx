import { useState } from 'react';
import { HelpCircle, MessageSquare, Bug, Lightbulb, Phone, Mail, Star } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { faqItems } from '../data/synthetic';
import { useToast } from '../context/ToastContext';

const supportOptions = [
  { icon: HelpCircle, title: 'FAQ', desc: 'Find answers to common questions' },
  { icon: Phone, title: 'Contact Support', desc: 'Reach our support team' },
  { icon: MessageSquare, title: 'Submit Feedback', desc: 'Share your experience' },
  { icon: Bug, title: 'Report an Issue', desc: 'Let us know about bugs' },
  { icon: Lightbulb, title: 'Feature Request', desc: 'Suggest new features' },
];

export default function Feedback() {
  const [activeSection, setActiveSection] = useState<'faq' | 'form'>('faq');
  const [rating, setRating] = useState(0);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Your feedback has been submitted.', 'success');
  };

  return (
    <Layout>
      <div className="bg-beige min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Help & Support' }]} />

          <h1 className="text-3xl sm:text-4xl font-bold text-deep-green font-heading mb-2">How can we help?</h1>
          <p className="text-muted mb-8">We're here to support your farming journey.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {supportOptions.map(opt => (
              <Card
                key={opt.title}
                hover
                onClick={() => setActiveSection(opt.title === 'FAQ' ? 'faq' : 'form')}
                className="text-center cursor-pointer"
              >
                <opt.icon className="w-8 h-8 text-leaf mx-auto mb-3" />
                <h3 className="font-bold text-deep-green text-sm">{opt.title}</h3>
                <p className="text-xs text-muted mt-1">{opt.desc}</p>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {activeSection === 'faq' ? (
              <Card className="lg:col-span-2">
                <h2 className="text-xl font-bold text-deep-green font-heading mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqItems.map((item, i) => (
                    <details key={i} className="group bg-beige rounded-xl">
                      <summary className="px-5 py-4 cursor-pointer font-medium text-deep-green hover:text-leaf transition-colors list-none flex items-center justify-between">
                        {item.q}
                        <span className="text-leaf group-open:rotate-45 transition-transform text-xl">+</span>
                      </summary>
                      <p className="px-5 pb-4 text-sm text-muted leading-relaxed">{item.a}</p>
                    </details>
                  ))}
                </div>
              </Card>
            ) : (
              <>
                <Card>
                  <h2 className="text-xl font-bold text-deep-green font-heading mb-6">Submit Feedback</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Name" required className="w-full px-4 py-2.5 rounded-xl border border-border bg-beige text-sm" />
                    <input type="email" placeholder="Email" required className="w-full px-4 py-2.5 rounded-xl border border-border bg-beige text-sm" />
                    <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-beige text-sm">
                      <option>General Feedback</option>
                      <option>Bug Report</option>
                      <option>Feature Request</option>
                      <option>Support</option>
                    </select>
                    <textarea placeholder="Your message..." rows={4} required className="w-full px-4 py-2.5 rounded-xl border border-border bg-beige text-sm" />
                    <div>
                      <p className="text-sm text-muted mb-2">Rating</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(n => (
                          <button key={n} type="button" onClick={() => setRating(n)}>
                            <Star className={`w-6 h-6 ${n <= rating ? 'text-warm-yellow fill-warm-yellow' : 'text-border'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Submit Feedback</Button>
                  </form>
                </Card>

                <div className="space-y-4">
                  <Card>
                    <div className="flex items-center gap-3">
                      <Phone className="w-8 h-8 text-leaf" />
                      <div>
                        <h3 className="font-bold text-deep-green">Phone Support</h3>
                        <p className="text-sm text-muted">1800-XXX-XXXX (Toll Free)</p>
                        <p className="text-xs text-muted">Mon–Sat, 9 AM – 6 PM IST</p>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex items-center gap-3">
                      <Mail className="w-8 h-8 text-leaf" />
                      <div>
                        <h3 className="font-bold text-deep-green">Email Support</h3>
                        <p className="text-sm text-muted">support@kisanseva.in</p>
                        <p className="text-xs text-muted">Response within 24 hours</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
