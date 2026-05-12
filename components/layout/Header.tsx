
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Search, PhoneCall, Languages, Palette, Moon, Sun, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '@/lib/context/SettingsContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 transition-transform group-hover:scale-105 duration-300">
                <Image
                  src="/smeda-logo.png"
                  alt="SMEDA Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-black text-primary leading-none tracking-tighter transition-colors">SMEDA</span>
                <span className="text-[9px] text-text-muted font-bold uppercase tracking-[0.1em]">{t.nav.financialServices}</span>
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

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-muted hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 top-16 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="fixed top-16 left-0 right-0 bg-card-bg border-b border-border z-50 md:hidden overflow-hidden shadow-xl"
            >
              <div className="flex flex-col p-4 space-y-4">
                <Link 
                  href="/how-it-works" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-page-bg text-text-main font-bold flex items-center justify-between"
                >
                  {t.nav.howItWorks}
                  <span className="text-primary">→</span>
                </Link>
                <Link 
                  href="/directives" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-page-bg text-text-main font-bold flex items-center justify-between"
                >
                  {t.nav.directives}
                  <span className="text-primary">→</span>
                </Link>
                <Link 
                  href="/schemes/sbp" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-page-bg text-text-main font-bold flex items-center justify-between"
                >
                  {t.nav.sbp}
                  <span className="text-primary">→</span>
                </Link>
                <Link 
                  href="/schemes/pmyb-als" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-page-bg text-text-main font-bold flex items-center justify-between"
                >
                  {t.nav.pmyb}
                  <span className="text-primary">→</span>
                </Link>
                <div className="pt-4 border-t border-border flex items-center justify-between px-4">
                  <span className="text-sm font-bold text-text-muted">{t.nav.callUs}</span>
                  <Link 
                    href="tel:+9242111111456" 
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    +92 42 111 111 456
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
