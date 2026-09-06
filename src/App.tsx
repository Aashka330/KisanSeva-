import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import EnvironmentalImpact from './pages/EnvironmentalImpact';
import MarketIntelligence from './pages/MarketIntelligence';
import TimberMarket from './pages/TimberMarket';
import GlobalTrade from './pages/GlobalTrade';
import SmartFarmAdvisor from './pages/SmartFarmAdvisor';
import WeatherIntelligence from './pages/WeatherIntelligence';
import FarmingAssistant from './pages/FarmingAssistant';
import NewsPolicies from './pages/NewsPolicies';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Feedback from './pages/Feedback';
import About from './pages/About';

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/environmental-impact" element={<EnvironmentalImpact />} />
            <Route path="/market-intelligence" element={<MarketIntelligence />} />
            <Route path="/timber-market" element={<TimberMarket />} />
            <Route path="/global-trade" element={<GlobalTrade />} />
            <Route path="/smart-farm-advisor" element={<SmartFarmAdvisor />} />
            <Route path="/weather" element={<WeatherIntelligence />} />
            <Route path="/farming-assistant" element={<FarmingAssistant />} />
            <Route path="/news" element={<NewsPolicies />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </LanguageProvider>
  );
}
