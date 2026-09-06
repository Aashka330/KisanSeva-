import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Sprout, Leaf, BarChart3, Cloud, FlaskConical,
  Bookmark, Bell, Settings, LogOut, TreePine, Menu, X,
} from 'lucide-react';
import { useState } from 'react';
import Logo from '../layout/Logo';

const sidebarLinks = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
  { label: 'My Farm', to: '/dashboard/farm', icon: Sprout },
  { label: 'Recommendations', to: '/recommendations', icon: Leaf },
  { label: 'Environmental Impact', to: '/environmental-impact', icon: TreePine },
  { label: 'Market', to: '/market-intelligence', icon: BarChart3 },
  { label: 'Weather', to: '/weather', icon: Cloud },
  { label: 'Farm Advisor', to: '/smart-farm-advisor', icon: FlaskConical },
  { label: 'Saved Crops', to: '/dashboard', icon: Bookmark },
  { label: 'Saved Plants', to: '/dashboard', icon: Bookmark },
  { label: 'Saved Trees', to: '/dashboard', icon: Bookmark },
  { label: 'Alerts', to: '/dashboard', icon: Bell },
  { label: 'Settings', to: '/dashboard', icon: Settings },
];

export default function DashboardSidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-border">
        <Logo />
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map(link => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? 'bg-beige text-deep-green' : 'text-muted hover:bg-beige/50 hover:text-deep-green'
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:bg-beige/50">
          <LogOut className="w-5 h-5" /> Back to Site
        </Link>
      </div>
    </>
  );

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-surface rounded-lg shadow-soft"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-deep-green/40 z-40" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border flex flex-col transform transition-transform ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <SidebarContent />
      </aside>
    </>
  );
}
