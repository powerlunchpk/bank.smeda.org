'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, MapPin, DollarSign, Percent, Calendar } from 'lucide-react';
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
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl bg-card-bg rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col mx-2 sm:mx-0 border border-border"
        >
          {/* Header */}
          <div className="p-5 sm:p-8 border-b border-border flex items-center justify-between bg-card-bg sticky top-0 z-10">
            <div>
              <h2 className="text-xl sm:text-3xl font-display font-bold text-text-main mb-1">{t.comparisonModal.title}</h2>
              <p className="text-[10px] sm:text-sm text-text-muted font-medium">{t.comparisonModal.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 sm:p-3 bg-page-bg hover:bg-primary/10 text-text-muted hover:text-primary rounded-xl sm:rounded-2xl transition-all"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-auto flex-grow p-4 sm:p-8 scrollbar-hide">
            <div className="min-w-[700px] lg:min-w-0">
              <div className="grid grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-12">
                <div className="pt-12 sm:pt-20">
                  <p className="text-[9px] sm:text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">{t.comparisonModal.features}</p>
                </div>
                {products.map((product) => (
                  <div key={product.id} className="text-center group">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-page-bg rounded-2xl sm:rounded-3xl border border-border p-3 sm:p-4 mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg transition-all group-hover:scale-105 duration-500">
                      <Image
                        src={product.bankLogo}
                        alt={product.bankName}
                        width={64}
                        height={64}
                        className="object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="text-xs sm:text-lg font-bold text-text-main mb-1 line-clamp-1">{product.productName}</h3>
                    <p className="text-[10px] sm:text-sm font-semibold text-primary">{product.bankName}</p>
                  </div>
                ))}
                {/* Empty slots for visual balance if < 3 products */}
                {Array.from({ length: 3 - products.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="opacity-20 flex flex-col items-center">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-page-bg rounded-2xl sm:rounded-3xl border-2 border-dashed border-border mx-auto mb-4 sm:mb-6" />
                        <div className="w-20 sm:w-32 h-2 sm:h-4 bg-border rounded-full mb-2" />
                        <div className="w-16 sm:w-24 h-2 sm:h-3 bg-border rounded-full" />
                    </div>
                ))}
              </div>

              {/* Rows */}
              <ComparisonRow label={t.products.loanRange} icon={<DollarSign className="w-4 h-4" />}>
                {products.map(p => (
                  <div key={p.id} className="text-center">
                    <p className="text-sm sm:text-lg font-bold text-text-main">
                      {p.loanAmount.max >= 1000000 ? `${(p.loanAmount.max / 1000000).toFixed(1)}M` : `${p.loanAmount.max / 1000}k`}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-text-muted uppercase">{t.calculator.pkr} Limit</p>
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label={t.products.markup} icon={<Percent className="w-4 h-4" />}>
                {products.map(p => (
                  <div key={p.id} className="text-center">
                    <p className="text-sm sm:text-lg font-bold text-primary">{p.markup}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-text-muted uppercase">{t.calculator.rate}</p>
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label={t.products.sector} icon={<Building2 className="w-4 h-4" />}>
                {products.map(p => (
                  <div key={p.id} className="flex flex-wrap justify-center gap-1 sm:gap-1.5 px-2 sm:px-4">
                    {p.sectors.map(s => (
                      <span key={s} className="px-1.5 py-0.5 bg-page-bg text-text-muted rounded text-[9px] sm:text-[10px] font-bold border border-border">
                        {s}
                      </span>
                    ))}
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label={t.products.city} icon={<MapPin className="w-4 h-4" />}>
                {products.map(p => (
                  <div key={p.id} className="text-center px-2 sm:px-4">
                    <p className="text-[10px] sm:text-xs font-semibold text-text-muted leading-tight">
                      {p.cities.slice(0, 3).join(', ')}{p.cities.length > 3 ? '...' : ''}
                    </p>
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label={t.products.lastUpdated} icon={<Calendar className="w-4 h-4" />}>
                {products.map(p => (
                  <div key={p.id} className="text-center">
                    <p className="text-xs sm:text-sm font-bold text-text-main">{p.lastUpdated}</p>
                  </div>
                ))}
              </ComparisonRow>

              <div className="grid grid-cols-4 gap-4 sm:gap-8 mt-8 sm:mt-12 py-6 sm:py-8 bg-page-bg rounded-2xl sm:rounded-3xl border border-border">
                <div />
                {products.map(p => (
                  <div key={p.id} className="text-center px-2 sm:px-4">
                    <Link 
                      href={`/apply/${p.id}`}
                      className="inline-block w-full bg-primary text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                    >
                      {t.products.apply}
                    </Link>
                    <Link 
                      href={`/products/${p.id}`}
                      className="mt-2 text-[8px] sm:text-[10px] font-bold text-text-muted hover:text-primary uppercase tracking-widest block"
                    >
                      {t.products.details}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ComparisonRow({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className="grid grid-cols-4 gap-8 py-8 border-b border-border items-center hover:bg-page-bg/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          {icon}
        </div>
        <span className="text-sm font-bold text-text-muted uppercase tracking-wider">{label}</span>
      </div>
      {children}
    </div>
  );
}
