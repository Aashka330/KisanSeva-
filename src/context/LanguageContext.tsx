import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    recommendations: 'Recommendations',
    environmental: 'Environmental Impact',
    market: 'Market Intelligence',
    assistant: 'Farming Assistant',
    news: 'News & Policies',
    about: 'About',
    login: 'Login',
    getStarted: 'Get Started',
    tagline: 'Smart Farming. Better Decisions. Greener Future.',
  },
  hi: {
    home: 'होम',
    recommendations: 'सिफारिशें',
    environmental: 'पर्यावरण प्रभाव',
    market: 'बाजार खुफिया',
    assistant: 'कृषि सहायक',
    news: 'समाचार और नीतियां',
    about: 'हमारे बारे में',
    login: 'लॉगिन',
    getStarted: 'शुरू करें',
    tagline: 'स्मार्ट खेती। बेहतर निर्णय। हरित भविष्य।',
  },
  mr: {
    home: 'मुख्यपृष्ठ',
    recommendations: 'शिफारसी',
    environmental: 'पर्यावरणीय प्रभाव',
    market: 'बाजार माहिती',
    assistant: 'शेती सहाय्यक',
    news: 'बातम्या आणि धोरणे',
    about: 'आमच्याबद्दल',
    login: 'लॉगिन',
    getStarted: 'सुरू करा',
    tagline: 'स्मार्ट शेती. चांगले निर्णय. हिरवे भविष्य.',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const t = useCallback((key: string) => translations[language][key] ?? key, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
