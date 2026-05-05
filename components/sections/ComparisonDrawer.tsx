'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRightLeft, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { BankingProduct } from '@/lib/types';

interface ComparisonDrawerProps {
  selectedProducts: BankingProduct[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

export default function ComparisonDrawer({ selectedProducts, onRemove, onClear, onCompare }: ComparisonDrawerProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  
  if (selectedProducts.length === 0) return null;

  return (
    <motion.div
      id="compare-tour-target"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-2xl pb-safe"
    >
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-t-xl border-t border-x border-slate-200 text-slate-400 flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-black/5"
      >
        {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        {isExpanded ? 'Hide' : 'Show Selection'}
      </button>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-6 ${isExpanded ? 'flex' : 'hidden lg:flex'}`}>
          <div className="flex items-center gap-3 flex-shrink-0 w-full lg:w-auto overflow-hidden">
            <div className="w-10 h-10 bg-smeda-blue rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ArrowRightLeft className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-800 leading-tight">Comparison Queue</p>
              <p className="text-xs text-slate-500 font-medium">{selectedProducts.length} items added</p>
            </div>
          </div>

          <div className="flex-grow w-full overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-2 lg:pb-0">
              {[0, 1, 2].map((index) => {
                const product = selectedProducts[index];
                return (
                  <div key={index} className="w-[180px] lg:flex-1 lg:min-w-[200px] h-16 lg:h-20 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-center px-3 lg:px-4 relative transition-all overflow-hidden">
                    {product ? (
                      <>
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-lg border border-slate-100 p-1 flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={product.bankLogo}
                            alt={product.bankName}
                            width={32}
                            height={32}
                            className="object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="ml-2 lg:ml-3 pr-10 overflow-hidden">
                          <p className="text-[10px] lg:text-xs font-bold text-slate-800 truncate leading-none mb-0.5">{product.productName}</p>
                          <p className="text-[9px] lg:text-[10px] font-semibold text-smeda-blue truncate">{product.bankName}</p>
                        </div>
                        <div className="absolute right-1.5 top-0 bottom-0 flex flex-col justify-center gap-1">
                          <button
                            onClick={() => onRemove(product.id)}
                            className="p-1 text-slate-400 hover:text-red-500 hover:bg-white rounded-md transition-all shadow-sm"
                            title="Remove"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <Link
                            href={`/apply/${product.id}`}
                            className="p-1 text-slate-400 hover:text-smeda-blue hover:bg-white rounded-md transition-all shadow-sm"
                            title="Quick Apply"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 opacity-50">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 border-slate-200 border-dashed" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Open Slot</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onClear}
              className="flex-1 lg:flex-none px-4 py-2 text-slate-500 hover:text-slate-800 text-sm font-bold transition-colors whitespace-nowrap"
            >
              Clear
            </button>
            <button
              disabled={selectedProducts.length < 2}
              onClick={onCompare}
              className={`flex-grow lg:flex-none px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg whitespace-nowrap ${selectedProducts.length >= 2 ? 'bg-smeda-blue text-white hover:bg-blue-800 shadow-blue-500/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
            >
              Compare
              <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-black">{selectedProducts.length}</span>
            </button>
          </div>
        </div>

        {/* Mobile Summary (when collapsed) */}
        <div className={`lg:hidden flex items-center justify-between ${isExpanded ? 'hidden' : 'flex'}`}>
            <div className="flex -space-x-4">
                {selectedProducts.map((p, i) => (
                    <div key={p.id} className="w-10 h-10 rounded-full border-4 border-white bg-white shadow-md overflow-hidden relative z-[i]">
                         <Image src={p.bankLogo} alt="Logo" fill className="object-contain p-1" />
                    </div>
                ))}
            </div>
            <button
              disabled={selectedProducts.length < 2}
              onClick={onCompare}
              className={`px-6 py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg whitespace-nowrap ${selectedProducts.length >= 2 ? 'bg-smeda-blue text-white' : 'bg-slate-100 text-slate-400'}`}
            >
              Compare {selectedProducts.length} items
            </button>
        </div>
      </div>
    </motion.div>
  );
}
