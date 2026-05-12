'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import VideoCarousel from '@/components/sections/VideoCarousel';
import WebsiteDescription from '@/components/sections/WebsiteDescription';
import Filters from '@/components/sections/Filters';
import ProductCard from '@/components/sections/ProductCard';
import IncentiveCards from '@/components/sections/IncentiveCards';
import ContactUs from '@/components/sections/ContactUs';
import ComparisonDrawer from '@/components/sections/ComparisonDrawer';
import ComparisonModal from '@/components/sections/ComparisonModal';
import LoanCalculator from '@/components/sections/LoanCalculator';
import OnboardingTour from '@/components/sections/OnboardingTour';
import { MOCK_PRODUCTS } from '@/lib/data';
import { BankingProduct, FilterState, SortOption } from '@/lib/types';
import { useSettings } from '@/lib/context/SettingsContext';
import { ListFilter, LayoutGrid, ChevronDown, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function Home() {
  const [filterState, setFilterState] = useState<FilterState>({
    purpose: [],
    sector: [],
    bank: [],
    city: [],
    loanAmount: null
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('a-z');
  const [comparedProducts, setComparedProducts] = useState<BankingProduct[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  const { t } = useSettings();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    const query = debouncedSearchQuery.toLowerCase().trim();
    
    const result = [...MOCK_PRODUCTS].filter(product => {
      const matchPurpose = filterState.purpose.length === 0 || filterState.purpose.some(p => product.purpose.includes(p));
      const matchSector = filterState.sector.length === 0 || filterState.sector.some(s => product.sectors.includes(s));
      const matchBank = filterState.bank.length === 0 || filterState.bank.some(b => product.bankName.includes(b));
      const matchCity = filterState.city.length === 0 || filterState.city.includes('All Cities') || filterState.city.some(c => product.cities.includes(c));
      const matchAmount = !filterState.loanAmount || (product.loanAmount.min <= filterState.loanAmount && product.loanAmount.max >= filterState.loanAmount);

      // Enhanced Keyword Search
      const matchSearch = !query || 
        product.productName.toLowerCase().includes(query) ||
        product.bankName.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.purpose.some(p => p.toLowerCase().includes(query)) ||
        product.sectors.some(s => s.toLowerCase().includes(query));

      return matchPurpose && matchSector && matchBank && matchCity && matchAmount && matchSearch;
    });

    if (sortOption === 'a-z') {
      result.sort((a, b) => a.bankName.localeCompare(b.bankName));
    } else if (sortOption === 'z-a') {
      result.sort((a, b) => b.bankName.localeCompare(a.bankName));
    } else if (sortOption === 'recently_updated') {
      result.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    }

    return result;
  }, [debouncedSearchQuery, filterState, sortOption]);

  const toggleCompare = (product: BankingProduct) => {
    setComparedProducts(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, product];
    });
  };

  return (
    <main className="min-h-screen relative pb-32">
      <Header />
      <OnboardingTour />
      <Hero />
      <VideoCarousel />
      <WebsiteDescription />
      <div id="calculator-tour-target">
        <LoanCalculator />
      </div>

      {/* Main Filter/Product Section */}
      <section className="py-12 bg-page-bg transition-colors" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden sticky top-20 z-30 mb-4">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="w-full h-12 bg-card-bg border border-border rounded-xl shadow-md flex items-center justify-center gap-2 font-bold text-primary transition-all active:scale-95"
              >
                <ListFilter className="w-5 h-5" />
                {t.products.filters}
                {Object.values(filterState).flat().filter(v => v !== null).length > 0 && (
                  <span className="w-5 h-5 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                    {Object.values(filterState).flat().filter(v => v !== null).length}
                  </span>
                )}
              </button>
            </div>

            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block">
              <Filters state={filterState} setState={setFilterState} />
            </div>

            {/* Sidebar Filters - Mobile Overlay */}
            <AnimatePresence>
              {isFilterOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
                  />
                  <motion.div
                    initial={{ x: t.dir === 'rtl' ? '100%' : '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: t.dir === 'rtl' ? '100%' : '-100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-0 bottom-0 left-0 right-0 w-[85%] max-w-sm bg-card-bg z-[70] lg:hidden overflow-y-auto shadow-2xl p-4"
                  >
                    <Filters state={filterState} setState={setFilterState} onClose={() => setIsFilterOpen(false)} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Product List */}
            <div className="flex-grow">
              {/* Search Bar */}
              <div className="mb-8 relative" id="search-tour-target">
                <input
                  id="main-search-input"
                  type="text"
                  placeholder={t.hero.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-card-bg border border-border rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-text-muted/50 font-medium text-text-main"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl text-text-main">{t.products.title}</h2>
                  <p className="text-text-muted text-sm">{t.products.results.replace('{count}', filteredProducts.length.toString()).replace('{subtitle}', t.products.subtitle)}</p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sorting */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 bg-card-bg rounded-xl border border-border text-sm font-bold text-text-main hover:border-primary transition-all">
                      {t.products.sort}: {sortOption === 'a-z' ? t.products.alphabeticalAZ : sortOption === 'z-a' ? t.products.alphabeticalZA : t.products.recentlyUpdated}
                      <ChevronDown className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-48 bg-card-bg rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 transform translate-y-2 group-hover:translate-y-0">
                      <button onClick={() => setSortOption('recently_updated')} className="w-full text-left px-4 py-3 text-sm text-text-muted hover:bg-page-bg hover:text-primary font-semibold first:rounded-t-xl">{t.products.recentlyUpdated}</button>
                      <button onClick={() => setSortOption('a-z')} className="w-full text-left px-4 py-3 text-sm text-text-muted hover:bg-page-bg hover:text-primary font-semibold">{t.products.alphabeticalAZ}</button>
                      <button onClick={() => setSortOption('z-a')} className="w-full text-left px-4 py-3 text-sm text-text-muted hover:bg-page-bg hover:text-primary font-semibold last:rounded-b-xl">{t.products.alphabeticalZA}</button>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center bg-card-bg p-1 rounded-xl border border-border transition-colors">
                    <button className="p-2 text-primary bg-primary/10 rounded-lg"><ListFilter className="w-4 h-4" /></button>
                    <button className="p-2 text-text-muted hover:text-text-main transition-colors"><LayoutGrid className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              {/* Grid of Results */}
              <div className="space-y-6 min-h-[400px]">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <ProductCard
                          product={product}
                          isCompared={!!comparedProducts.find(p => p.id === product.id)}
                          onCompareToggle={toggleCompare}
                          disabled={comparedProducts.length >= 3 && !comparedProducts.find(p => p.id === product.id)}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-20 text-center bg-card-bg rounded-3xl border-2 border-dashed border-border shadow-inner"
                    >
                      <div className="w-16 h-16 bg-page-bg rounded-full flex items-center justify-center mx-auto mb-4">
                        <ListFilter className="w-8 h-8 text-text-muted/30" />
                      </div>
                      <h3 className="text-xl font-bold text-text-main mb-2">{t.products.noResults}</h3>
                      <p className="text-text-muted">{t.products.noResultsSub}</p>
                      <button onClick={() => setFilterState({ purpose: [], sector: [], bank: [], city: [], loanAmount: null })} className="mt-6 text-primary font-bold hover:underline">{t.products.clearFilters}</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <IncentiveCards />
      <ContactUs />

      {/* Comparison Drawer overlay */}
      <AnimatePresence>
        {comparedProducts.length > 0 && (
          <ComparisonDrawer
            selectedProducts={comparedProducts}
            onRemove={(id) => setComparedProducts(prev => prev.filter(p => p.id !== id))}
            onClear={() => setComparedProducts([])}
            onCompare={() => setIsComparisonModalOpen(true)}
          />
        )}
      </AnimatePresence>

      <ComparisonModal 
        isOpen={isComparisonModalOpen} 
        onClose={() => setIsComparisonModalOpen(false)} 
        products={comparedProducts} 
      />
    </main>
  );
}
