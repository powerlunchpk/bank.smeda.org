
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, translations } from '../i18n';

interface SettingsContextType {
  language: Language;
  theme: Theme;
  isDarkMode: boolean;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
  t: typeof translations.en;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('classic');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Persistence
  useEffect(() => {
    const savedLang = localStorage.getItem('app-lang') as Language;
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    const savedDark = localStorage.getItem('app-dark') === 'true';

    if (savedLang) setLanguage(savedLang);
    if (savedTheme) setTheme(savedTheme);
    if (savedDark) setIsDarkMode(savedDark);
  }, []);

  useEffect(() => {
    localStorage.setItem('app-lang', language);
    localStorage.setItem('app-theme', theme);
    localStorage.setItem('app-dark', String(isDarkMode));

    // Update body classes for theme/dark-mode
    const body = document.documentElement;
    
    // Remove old themes
    body.classList.remove('classic', 'corporate', 'dark');
    
    // Add current theme and dark mode
    body.classList.add(theme);
    if (isDarkMode) body.classList.add('dark');
    
    body.dir = translations[language].dir;
    body.lang = language;
  }, [language, theme, isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const value = {
    language,
    theme,
    isDarkMode,
    setLanguage,
    setTheme,
    toggleDarkMode,
    t: translations[language]
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
