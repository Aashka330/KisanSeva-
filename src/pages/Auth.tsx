import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, User, MapPin, Sprout } from 'lucide-react';
import Logo from '../components/layout/Logo';
import Button from '../components/ui/Button';
import DemoBadge from '../components/ui/DemoBadge';

const userTypes = ['Farmer', 'Plant Enthusiast', 'Wood Vendor', 'Agribusiness', 'Researcher', 'Other'];

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'login' | 'signup'>(searchParams.get('mode') === 'signup' ? 'signup' : 'login');

  const inputClass = 'w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-beige text-sm focus:outline-none focus:ring-2 focus:ring-leaf-light/50';

  return (
    <div className="min-h-screen flex">
      {/* Left illustration panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-deep-green via-deep-green-light to-leaf items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute bottom-0 h-32 bg-leaf-light/30 rounded-t-full" style={{ left: `${i * 18}%`, width: '15%' }} />
          ))}
        </div>
        <div className="relative text-center text-white max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
            <Leaf className="w-20 h-20 text-leaf-pale mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold font-heading mb-4">Welcome to KisanSeva</h2>
          <p className="text-leaf-pale/80 leading-relaxed">
            Smart Farming. Better Decisions. Greener Future.
          </p>
          <p className="mt-6 text-sm text-leaf-pale/60">
            Join thousands of farmers making smarter agricultural decisions with AI-powered intelligence.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-cream">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo />
          </div>

          <div className="flex gap-2 mb-8 bg-beige rounded-full p-1">
            {(['login', 'signup'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${
                  mode === m ? 'bg-surface shadow-soft text-deep-green' : 'text-muted'
                }`}
              >
                {m === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          <h1 className="text-2xl font-bold text-deep-green font-heading mb-2">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-muted mb-6">
            {mode === 'login' ? 'Sign in to access your farm dashboard.' : 'Start your smart farming journey today.'}
          </p>

          <form className="space-y-4" onSubmit={e => { e.preventDefault(); window.location.href = '/dashboard'; }}>
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input type="text" placeholder="Full Name" className={inputClass} required />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input type="email" placeholder="Email or Phone" className={inputClass} required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input type="password" placeholder="Password" className={inputClass} required />
            </div>
            {mode === 'signup' && (
              <>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input type="text" placeholder="Location" className={inputClass} />
                </div>
                <div className="relative">
                  <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <select className={inputClass} defaultValue="Farmer">
                    {userTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </>
            )}
            <Button type="submit" className="w-full" size="lg">
              {mode === 'login' ? 'Login' : 'Create Account'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-cream px-4 text-xs text-muted">or continue with</span></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-surface text-sm font-medium hover:bg-beige transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-muted">
            <Link to="/" className="text-leaf hover:text-deep-green font-medium">← Back to Home</Link>
          </p>

          <div className="mt-4 flex justify-center">
            <DemoBadge />
          </div>
        </div>
      </div>
    </div>
  );
}
