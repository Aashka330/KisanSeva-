import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useLanguage } from '../../context/LanguageContext';

const footerLinks = {
  Platform: [
    { label: 'Recommendations', to: '/recommendations' },
    { label: 'Market Intelligence', to: '/market-intelligence' },
    { label: 'Environmental Impact', to: '/environmental-impact' },
    { label: 'AI Assistant', to: '/farming-assistant' },
  ],
  Resources: [
    { label: 'Agriculture News', to: '/news' },
    { label: 'Government Policies', to: '/news?filter=Government' },
    { label: 'Farming Guide', to: '/smart-farm-advisor' },
    { label: 'FAQs', to: '/feedback' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/feedback' },
    { label: 'Feedback', to: '/feedback' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/about' },
    { label: 'Terms', to: '/about' },
    { label: 'Data Policy', to: '/about' },
  ],
};

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-deep-green text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Logo className="[&_span]:text-white [&_span:last-child]:text-leaf-pale" />
            <p className="mt-4 text-leaf-pale/80 text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
            <p className="mt-6 text-leaf-pale/60 text-xs">
              AI-powered agricultural intelligence for farmers, businesses, and enthusiasts.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 text-leaf-pale">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">© 2026 KisanSeva. All rights reserved.</p>
          <p className="text-xs text-white/40">Some pages use demo data. Crop suitability uses Open-Meteo location weather and climate with provisional crop reference ranges.</p>
        </div>
      </div>
    </footer>
  );
}
