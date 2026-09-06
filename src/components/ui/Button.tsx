import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  icon?: LucideIcon;
}

const variants = {
  primary: 'bg-deep-green text-white hover:bg-deep-green-light shadow-soft hover:shadow-hover',
  secondary: 'bg-warm-yellow text-deep-green hover:bg-warm-yellow-dark shadow-soft',
  outline: 'border-2 border-deep-green text-deep-green hover:bg-deep-green hover:text-white',
  ghost: 'text-deep-green hover:bg-beige',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  icon: Icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}
