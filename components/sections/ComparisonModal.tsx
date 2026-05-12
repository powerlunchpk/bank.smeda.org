'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, MapPin, DollarSign, Percent, Calendar, LayoutGrid, List, ArrowRightLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { BankingProduct } from '@/lib/types';
import { useSettings } from '@/lib/context/SettingsContext';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: BankingProduct[];
}

export default function ComparisonModal({ isOpen, onClose, products }: ComparisonModalProps) {
  const { t } = useSettings();
  const [view, setView] = React.useState<'table' | 'cards'>('table');

  // Mobile first default view
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setView('cards');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-5xl bg-card-bg rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col mx-2 sm:mx-0 border border-border"
        >
          {/* Compact Top Bar - NON-STICKY */}
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-border flex items-center justify-between bg-card-bg z-30">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex w-8 h-8 bg-primary/10 rounded-lg items-center justify-center text-primary">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-lg font-bold text-text-main leading-tight">{t.comparisonModal.title}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                    {products.length} {t.products.comparing}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {/* Integrated View Switcher */}
              <div className="flex bg-page-bg p-0.5 rounded-lg border border-border">
                <button
                  onClick={() => setView('table')}
                  className={`p-1.5 rounded-md transition-all ${view === 'table' ? 'bg-card-bg text-primary shadow-sm' : 'text-text-muted hover:text-text-main'}`}
                  title={t.comparisonModal.tableView}
                >
                  <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setView('cards')}
                  className={`p-1.5 rounded-md transition-all ${view === 'cards' ? 'bg-card-bg text-primary shadow-sm' : 'text-text-muted hover:text-text-main'}`}
                  title={t.comparisonModal.cardView}
                >
                  <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

              <button
                onClick={onClose}
                className="p-2 bg-page-bg hover:bg-primary/10 text-text-muted hover:text-primary rounded-xl transition-all border border-transparent hover:border-primary/20"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Comparison Content */}
          <div className="overflow-auto flex-grow p-4 sm:p-8 scrollbar-hide">
            {view === 'table' ? (
              <>
                {/* Slim Header - NON-STICKY */}
                <div className="bg-card-bg border-b border-border shadow-sm">
                  <div className="grid grid-cols-[80px_repeat(3,1fr)] sm:grid-cols-[140px_repeat(3,1fr)] gap-2 sm:gap-4 px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-center">
                      <p className="text-[8px] sm:text-[9px] font-black text-text-muted uppercase tracking-[0.2em]">{t.comparisonModal.features}</p>
                    </div>
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-page-bg rounded-lg border border-border p-1.5 flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={product.bankLogo}
                            alt={product.bankName}
                            width={32}
                            height={32}
                            className="object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[10px] sm:text-xs font-bold text-text-main truncate">{product.productName}</h3>
                          <p className="text-[7px] sm:text-[9px] font-bold text-primary uppercase tracking-wider">{product.bankName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-2">
                  <ComparisonRow label={t.products.loanRange} icon={<DollarSign className="w-4 h-4" />}>
                    {products.map(p => (
                      <div key={p.id} className="text-center">
                        <p className="text-xs sm:text-base font-bold text-text-main">
                          {p.loanAmount.max >= 1000000 ? `${(p.loanAmount.max / 1000000).toFixed(1)}M` : `${p.loanAmount.max / 1000}k`}
                        </p>
                        <p className="text-[8px] sm:text-[10px] text-text-muted uppercase">{t.calculator.pkr}</p>
                      </div>
                    ))}
                  </ComparisonRow>

                  <ComparisonRow label={t.products.markup} icon={<Percent className="w-4 h-4" />}>
                    {products.map(p => (
                      <div key={p.id} className="text-center">
                        <p className="text-xs sm:text-base font-bold text-primary">{p.markup}</p>
                      </div>
                    ))}
                  </ComparisonRow>

                  <ComparisonRow label={t.products.sector} icon={<Building2 className="w-4 h-4" />}>
                    {products.map(p => (
                      <div key={p.id} className="flex flex-wrap justify-center gap-1">
                        {p.sectors.slice(0, 2).map(s => (
                          <span key={s} className="px-1.5 py-0.5 bg-page-bg text-text-muted rounded text-[8px] sm:text-[10px] font-bold border border-border">
                            {s}
                          </span>
                        ))}
                      </div>
                    ))}
                  </ComparisonRow>

                  <ComparisonRow label={t.products.city} icon={<MapPin className="w-4 h-4" />}>
                    {products.map(p => (
                      <div key={p.id} className="text-center">
                        <p className="text-[9px] sm:text-xs font-semibold text-text-muted line-clamp-1">
                          {p.cities[0]}{p.cities.length > 1 ? '...' : ''}
                        </p>
                      </div>
                    ))}
                  </ComparisonRow>

                  <ComparisonRow label={t.products.lastUpdated} icon={<Calendar className="w-4 h-4" />}>
                    {products.map(p => (
                      <div key={p.id} className="text-center">
                        <p className="text-[10px] sm:text-sm font-bold text-text-main">{p.lastUpdated}</p>
                      </div>
                    ))}
                  </ComparisonRow>

                  {/* Slim Actions Row */}
                  <div className="grid grid-cols-[80px_repeat(3,1fr)] sm:grid-cols-[140px_repeat(3,1fr)] gap-2 sm:gap-4 pt-6 pb-2">
                    <div />
                    {products.map(p => (
                      <div key={p.id} className="text-center">
                        <Link 
                          href={`/apply/${p.id}`}
                          className="flex items-center justify-center gap-1.5 w-full bg-primary text-white py-2 rounded-lg sm:rounded-xl text-[9px] sm:text-[11px] font-bold hover:opacity-90 shadow-md shadow-primary/10 transition-all active:scale-[0.98]"
                        >
                          {t.products.apply}
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <Link 
                          href={`/products/${p.id}`}
                          className="mt-2 inline-block text-[8px] sm:text-[9px] font-black text-text-muted hover:text-primary uppercase tracking-[0.15em] transition-colors"
                        >
                          {t.products.details}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {products.map((product) => (
                  <motion.div 
                    layout
                    key={product.id} 
                    className="bg-page-bg rounded-[2rem] border border-border overflow-hidden flex flex-col group hover:border-primary/30 transition-colors shadow-lg"
                  >
                    <div className="p-6 flex-grow">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-card-bg rounded-2xl border border-border p-2.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500">
                          <Image
                            src={product.bankLogo}
                            alt={product.bankName}
                            width={40}
                            height={40}
                            className="object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-text-main leading-tight group-hover:text-primary transition-colors">{product.productName}</h3>
                          <p className="text-xs font-semibold text-primary">{product.bankName}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <CardFeature label={t.products.loanRange} icon={<DollarSign className="w-3.5 h-3.5" />}>
                           <p className="text-sm font-bold text-text-main">
                            {product.loanAmount.max >= 1000000 ? `${(product.loanAmount.max / 1000000).toFixed(1)}M` : `${product.loanAmount.max / 1000}k`}
                            <span className="text-[10px] ml-1 text-text-muted">{t.calculator.pkr}</span>
                          </p>
                        </CardFeature>

                        <CardFeature label={t.products.markup} icon={<Percent className="w-3.5 h-3.5" />}>
                           <p className="text-sm font-bold text-primary">{product.markup}</p>
                        </CardFeature>

                        <CardFeature label={t.products.sector} icon={<Building2 className="w-3.5 h-3.5" />}>
                           <div className="flex flex-wrap gap-1">
                            {product.sectors.slice(0, 3).map(s => (
                              <span key={s} className="px-1.5 py-0.5 bg-card-bg text-text-muted rounded text-[9px] font-bold border border-border">
                                {s}
                              </span>
                            ))}
                          </div>
                        </CardFeature>

                        <CardFeature label={t.products.city} icon={<MapPin className="w-3.5 h-3.5" />}>
                           <p className="text-[10px] font-semibold text-text-muted line-clamp-1">
                            {product.cities.slice(0, 3).join(', ')}{product.cities.length > 3 ? '...' : ''}
                          </p>
                        </CardFeature>
                      </div>
                    </div>

                    <div className="p-4 bg-card-bg/50 border-t border-border flex items-center gap-3">
                      <Link 
                        href={`/apply/${product.id}`}
                        className="flex-grow bg-primary text-white py-2.5 rounded-xl text-xs font-bold text-center shadow-lg shadow-primary/10 hover:opacity-90 transition-all"
                      >
                        {t.products.apply}
                      </Link>
                      <Link 
                        href={`/products/${product.id}`}
                        className="px-4 py-2.5 bg-page-bg text-text-muted hover:text-primary rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-border"
                      >
                        {t.products.details}
                      </Link>
                    </div>
                  </motion.div>
                ))}
                
                {/* Empty placeholders to encourage adding more */}
                {products.length < 3 && Array.from({ length: 3 - products.length }).map((_, i) => (
                  <div key={`empty-card-${i}`} className="bg-page-bg/30 rounded-[2rem] border-2 border-dashed border-border flex flex-col items-center justify-center p-8 text-center opacity-40">
                     <div className="w-12 h-12 rounded-full bg-border/50 mb-4" />
                     <div className="w-32 h-3 bg-border rounded-full mb-2" />
                     <div className="w-24 h-2 bg-border rounded-full" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function CardFeature({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-text-muted">
        <div className="p-1 bg-primary/10 text-primary rounded-md">
          {icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      {children}
    </div>
  );
}

function ComparisonRow({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] sm:grid-cols-[140px_repeat(3,1fr)] gap-2 sm:gap-4 py-3 sm:py-5 border-b border-border/40 items-center hover:bg-primary/[0.03] transition-colors group/row">
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        <div className="p-1 sm:p-2 bg-primary/[0.08] text-primary rounded-lg flex-shrink-0 group-hover/row:bg-primary/10 transition-colors">
          {React.cloneElement(icon as React.ReactElement, { className: 'w-3.5 h-3.5 sm:w-4 sm:h-4' })}
        </div>
        <span className="text-[7px] sm:text-[11px] font-bold text-text-muted uppercase tracking-widest leading-tight">{label}</span>
      </div>
      {children}
    </div>
  );
}
