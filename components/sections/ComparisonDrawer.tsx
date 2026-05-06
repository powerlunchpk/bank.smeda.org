'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { X, ArrowRightLeft, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { BankingProduct } from '@/lib/types';
import { useSettings } from '@/lib/context/SettingsContext';

interface ComparisonDrawerProps {
  selectedProducts: BankingProduct[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

export default function ComparisonDrawer({ selectedProducts, onRemove, onClear, onCompare }: ComparisonDrawerProps) {
  const { t } = useSettings();
  const [isExpanded, setIsExpanded] = React.useState(true);
  
  if (selectedProducts.length === 0) return null;

  return (
    <motion.div
      id="compare-tour-target"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-card-bg/95 backdrop-blur-xl border-t border-border shadow-2xl pb-safe transition-colors"
    >
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden absolute -top-8 left-1/2 -translate-x-1/2 bg-card-bg px-4 py-1.5 rounded-t-xl border-t border-x border-border text-text-muted flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest shadow-lg transition-colors"
      >
        {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        {isExpanded ? (t.dir === 'rtl' ? 'چھپائیں' : 'Hide') : (t.dir === 'rtl' ? 'دکھائیں' : 'Show Selection')}
      </button>

      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-4 ${isExpanded ? 'flex' : 'hidden lg:flex'}`}>
          <div className="flex items-center gap-3 flex-shrink-0 w-full lg:w-auto overflow-hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 transition-colors">
              <ArrowRightLeft className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-text-main leading-tight text-sm">{t.comparison.title}</p>
              <p className="text-[10px] text-text-muted font-medium">
                {t.comparison.added.replace('{count}', selectedProducts.length.toString())}
              </p>
            </div>
          </div>

          <div className="flex-grow w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-max pb-1 lg:pb-0">
              {[0, 1, 2].map((index) => {
                const product = selectedProducts[index];
                return (
                  <div key={index} className="w-[160px] lg:flex-1 lg:min-w-[180px] h-12 lg:h-14 rounded-xl border-2 border-dashed border-border bg-page-bg/50 flex items-center px-2 lg:px-3 relative transition-all overflow-hidden">
                    {product ? (
                      <>
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-card-bg rounded border border-border p-0.5 flex-shrink-0 flex items-center justify-center transition-colors">
                          <Image
                            src={product.bankLogo}
                            alt={product.bankName}
                            width={24}
                            height={24}
                            className="object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="ml-2 lg:ml-2.5 pr-8 overflow-hidden text-text-main">
                          <p className="text-[9px] lg:text-[10px] font-bold truncate leading-none mb-0.5">{product.productName}</p>
                          <p className="text-[8px] lg:text-[9px] font-semibold text-primary truncate">{product.bankName}</p>
                        </div>
                        <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-center gap-0.5">
                          <button
                            onClick={() => onRemove(product.id)}
                            className="p-1 text-text-muted hover:text-red-500 hover:bg-card-bg rounded transition-all"
                            title="Remove"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 opacity-50">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full border border-border border-dashed" />
                        <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest">{t.comparison.openSlot}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button
              onClick={onClear}
              className="flex-1 lg:flex-none px-3 py-1.5 text-text-muted hover:text-text-main text-xs font-bold transition-colors whitespace-nowrap"
            >
              {t.comparison.clear}
            </button>
            <button
              disabled={selectedProducts.length < 2}
              onClick={onCompare}
              className={`flex-grow lg:flex-none px-6 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg whitespace-nowrap ${selectedProducts.length >= 2 ? 'bg-primary text-white hover:opacity-90 shadow-primary/20' : 'bg-border text-text-muted cursor-not-allowed shadow-none'}`}
            >
              {t.comparison.compare}
              <span className="px-1.5 py-0.5 bg-white/20 rounded text-[9px] font-black">{selectedProducts.length}</span>
            </button>
          </div>
        </div>

        {/* Mobile Summary (when collapsed) */}
        <div className={`lg:hidden flex items-center justify-between ${isExpanded ? 'hidden' : 'flex'}`}>
            <div className="flex -space-x-4">
                {selectedProducts.map((p, index) => (
                    <div key={p.id} className="w-10 h-10 rounded-full border-4 border-card-bg bg-card-bg shadow-md overflow-hidden relative" style={{ zIndex: index }}>
                         <Image src={p.bankLogo} alt="Logo" fill className="object-contain p-1" />
                    </div>
                ))}
            </div>
            <button
              disabled={selectedProducts.length < 2}
              onClick={onCompare}
              className={`px-6 py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg whitespace-nowrap ${selectedProducts.length >= 2 ? 'bg-primary text-white' : 'bg-border text-text-muted opacity-50'}`}
            >
              {t.comparison.compare} {selectedProducts.length}
            </button>
        </div>
      </div>
    </motion.div>
  );
}
