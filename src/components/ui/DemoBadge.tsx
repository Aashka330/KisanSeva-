import { Info } from 'lucide-react';
import { DEMO_LABEL } from '../../data/synthetic';

interface DemoBadgeProps {
  className?: string;
  label?: string;
}

export default function DemoBadge({ className = '', label = DEMO_LABEL }: DemoBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-yellow/20 text-earth text-xs font-medium ${className}`}>
      <Info className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
