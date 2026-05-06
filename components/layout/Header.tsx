
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Search, PhoneCall, Languages, Palette, Moon, Sun } from 'lucide-react';
import { useSettings } from '@/lib/context/SettingsContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, theme, setTheme, isDarkMode, toggleDarkMode, t } = useSettings();

  const scrollToSearch = () => {
    if (pathname !== '/') {
      router.push('/#products');
      return;
    }
    const searchInput = document.getElementById('main-search-input');
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      searchInput.focus();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card-bg/80 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transition-colors">
                <span className="text-white font-display font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-display font-bold text-primary leading-tight uppercase tracking-wider transition-colors">SMEDA</span>
                <span className="text-[10px] text-text-muted font-medium uppercase tracking-[0.2em] -mt-1">{t.nav.financialServices}</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">{t.nav.howItWorks}</Link>
            <Link href="/directives" className="text-sm font-medium text-text-muted hover:text-primary transition-colors text-nowrap">{t.nav.directives}</Link>
            <Link href="/schemes/sbp" className="text-sm font-medium text-text-muted hover:text-primary transition-colors text-nowrap">{t.nav.sbp}</Link>
            <Link href="/schemes/pmyb-als" className="text-sm font-medium text-text-muted hover:text-primary transition-colors text-nowrap">{t.nav.pmyb}</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Setting Toggles */}
            <div className="flex items-center border-x border-border/50 px-2 gap-1">
               {/* Lang Switcher */}
              <button 
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                className="p-2 text-text-muted hover:text-primary rounded-md transition-colors flex items-center gap-1 text-xs font-bold"
                title={t.common.selectLanguage}
              >
                <Languages className="w-4 h-4" />
                <span className="hidden lg:inline">{language === 'en' ? 'UR' : 'EN'}</span>
              </button>

              {/* Theme Switcher */}
              <button 
                onClick={() => setTheme(theme === 'classic' ? 'corporate' : 'classic')}
                className="p-2 text-text-muted hover:text-primary rounded-md transition-colors"
                title={t.common.selectTheme}
              >
                <Palette className="w-4 h-4" />
              </button>

              {/* Dark Mode */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 text-text-muted hover:text-primary rounded-md transition-colors"
                title={t.common.darkMode}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            <button 
              onClick={scrollToSearch}
              className="p-2 text-text-muted hover:text-primary rounded-full hover:bg-page-bg transition-all"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link 
              href="tel:+9242111111456" 
              className="hidden sm:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/10"
            >
              <PhoneCall className="w-4 h-4" />
              <span className="hidden lg:inline">{t.nav.callUs}</span>
            </Link>

            <button className="md:hidden p-2 text-text-muted">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
