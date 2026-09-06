import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = '', light = false }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-hover transition-all duration-300 ${
        light ? 'bg-white/15 backdrop-blur-sm border border-white/20' : 'bg-deep-green'
      }`}>
        <svg viewBox="0 0 24 24" className={`w-5 h-5 ${light ? 'text-leaf-pale' : 'text-leaf-light'}`} fill="currentColor">
          <path d="M12 2C12 2 7 8 7 14C7 17.3 9.2 20 12 20C14.8 20 17 17.3 17 14C17 8 12 2 12 2Z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`text-xl font-bold font-heading leading-tight ${light ? 'text-white' : 'text-deep-green'}`}>
          KisanSeva
        </span>
        <span className={`text-[10px] leading-none hidden sm:block ${light ? 'text-white/60' : 'text-muted'}`}>
          Smart Farming Platform
        </span>
      </div>
    </Link>
  );
}
