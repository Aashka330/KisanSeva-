import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

const navLinks = [
  { key: 'home', to: '/' },
  { key: 'recommendations', to: '/recommendations' },
  { key: 'environmental', to: '/environmental-impact' },
  { key: 'market', to: '/market-intelligence' },
  { key: 'assistant', to: '/farming-assistant' },
  { key: 'news', to: '/news' },
  { key: 'about', to: '/about' },
];

const languages = [
  { code: 'en' as const, label: 'English' },
  { code: 'hi' as const, label: 'हिंदी' },
  { code: 'mr' as const, label: 'मराठी' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent border-b border-white/10'
          : 'bg-surface/95 backdrop-blur-xl border-b border-border shadow-soft'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          <Logo light={transparent} />

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    active
                      ? transparent
                        ? 'text-white bg-white/15'
                        : 'text-deep-green bg-beige'
                      : transparent
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-muted hover:text-deep-green hover:bg-beige/50'
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className={`flex items-center gap-1 text-xs rounded-full px-2 py-1 border ${
              transparent ? 'border-white/20' : 'border-border'
            }`}>
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 rounded-full transition-colors text-xs ${
                    language === lang.code
                      ? transparent ? 'bg-white text-deep-green' : 'bg-deep-green text-white'
                      : transparent ? 'text-white/70 hover:text-white' : 'text-muted hover:text-deep-green'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <Link
              to="/auth"
              className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                transparent ? 'text-white hover:bg-white/10' : 'text-deep-green hover:bg-beige'
              }`}
            >
              Login
            </Link>
            <Button variant={transparent ? 'secondary' : 'primary'} size="sm" to="/auth?mode=signup">
              {t('getStarted')}
            </Button>
          </div>

          <button
            className={`lg:hidden p-2 rounded-lg ${transparent ? 'text-white hover:bg-white/10' : 'hover:bg-beige'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-surface overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                    location.pathname === link.to ? 'bg-beige text-deep-green' : 'text-muted'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
              <div className="flex gap-2 pt-3 border-t border-border mt-3">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium ${
                      language === lang.code ? 'bg-deep-green text-white' : 'bg-beige text-muted'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-3">
                <Button variant="outline" size="sm" to="/auth" className="flex-1">Login</Button>
                <Button variant="primary" size="sm" to="/auth?mode=signup" className="flex-1">{t('getStarted')}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
