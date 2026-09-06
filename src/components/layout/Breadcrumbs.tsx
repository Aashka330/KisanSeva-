import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted mb-6">
      <Link to="/" className="hover:text-deep-green transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {item.to ? (
            <Link to={item.to} className="hover:text-deep-green transition-colors">{item.label}</Link>
          ) : (
            <span className="text-deep-green font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
