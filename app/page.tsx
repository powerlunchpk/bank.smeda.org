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

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('a-z');
  const [comparedProducts, setComparedProducts] = useState<BankingProduct[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

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
      <section className="py-12 bg-slate-50" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <Filters state={filterState} setState={setFilterState} />

            {/* Product List */}
            <div className="flex-grow">
              {/* Search Bar */}
              <div className="mb-8 relative" id="search-tour-target">
                <input
                  id="main-search-input"
                  type="text"
                  placeholder="Search by keywords (e.g. 'working capital', 'HBL', 'manufacturing')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-smeda-blue/20 focus:border-smeda-blue outline-none transition-all placeholder:text-slate-400 font-medium"
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
                  <h2 className="text-2xl text-slate-800">Banking Products</h2>
                  <p className="text-slate-500 text-sm">Showing {filteredProducts.length} tailored financial solutions</p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sorting */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-smeda-blue transition-all">
                      Sort: {sortOption === 'a-z' ? 'A-Z' : sortOption === 'z-a' ? 'Z-A' : 'Recently Updated'}
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-smeda-blue" />
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 transform translate-y-2 group-hover:translate-y-0">
                      <button onClick={() => setSortOption('recently_updated')} className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-smeda-blue font-semibold first:rounded-t-xl">Recently Updated</button>
                      <button onClick={() => setSortOption('a-z')} className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-smeda-blue font-semibold">Alphabetical (A-Z)</button>
                      <button onClick={() => setSortOption('z-a')} className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-smeda-blue font-semibold last:rounded-b-xl">Alphabetical (Z-A)</button>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center bg-white p-1 rounded-xl border border-slate-200">
                    <button className="p-2 text-smeda-blue bg-blue-50 rounded-lg"><ListFilter className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-slate-600"><LayoutGrid className="w-4 h-4" /></button>
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
                      className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-inner"
                    >
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ListFilter className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">No results matching filters</h3>
                      <p className="text-slate-500">Try adjusting your filters or search criteria.</p>
                      <button onClick={() => setFilterState({ purpose: [], sector: [], bank: [], city: [], loanAmount: null })} className="mt-6 text-smeda-blue font-bold hover:underline">Clear all filters</button>
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
