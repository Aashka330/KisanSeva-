import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover
    ? {
        whileHover: { y: -4, boxShadow: '0 12px 40px rgba(27, 67, 50, 0.15)' },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <Component
      onClick={onClick}
      className={`bg-surface rounded-2xl border border-border shadow-soft p-6 ${hover ? 'cursor-pointer' : ''} ${className}`}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}
