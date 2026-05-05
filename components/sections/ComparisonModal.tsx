'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, MapPin } from 'lucide-react';
import Image from 'next/image';
import { BankingProduct } from '@/lib/types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: BankingProduct[];
}

export default function ComparisonModal({ isOpen, onClose, products }: ComparisonModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col mx-2 sm:mx-0"
        >
          {/* Header */}
          <div className="p-5 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div>
              <h2 className="text-xl sm:text-3xl font-display font-bold text-slate-900 mb-1">Product Comparison</h2>
              <p className="text-[10px] sm:text-sm text-slate-500 font-medium">Side-by-side analysis of your selections</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 sm:p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-xl sm:rounded-2xl transition-all"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-auto flex-grow p-4 sm:p-8 scrollbar-hide">
            <div className="min-w-[700px] lg:min-w-0">
              <div className="grid grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-12">
                <div className="pt-12 sm:pt-20">
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Key Features</p>
                </div>
                {products.map((product) => (
                  <div key={product.id} className="text-center group">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 p-3 sm:p-4 mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg shadow-slate-100 group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={product.bankLogo}
                        alt={product.bankName}
                        width={64}
                        height={64}
                        className="object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="text-xs sm:text-lg font-bold text-slate-800 mb-1 line-clamp-1">{product.productName}</h3>
                    <p className="text-[10px] sm:text-sm font-semibold text-smeda-blue">{product.bankName}</p>
                  </div>
                ))}
                {/* Empty slots for visual balance if < 3 products */}
                {Array.from({ length: 3 - products.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="opacity-20 flex flex-col items-center">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-100 rounded-2xl sm:rounded-3xl border-2 border-dashed border-slate-300 mx-auto mb-4 sm:mb-6" />
                        <div className="w-20 sm:w-32 h-2 sm:h-4 bg-slate-200 rounded-full mb-2" />
                        <div className="w-16 sm:w-24 h-2 sm:h-3 bg-slate-200 rounded-full" />
                    </div>
                ))}
              </div>

              {/* Rows */}
              <ComparisonRow label="Loan Range" icon={<DollarSign className="w-4 h-4" />}>
                {products.map(p => (
                  <div key={p.id} className="text-center">
                    <p className="text-sm sm:text-lg font-bold text-slate-900">
                      {p.loanAmount.max >= 1000000 ? `${(p.loanAmount.max / 1000000).toFixed(1)}M` : `${p.loanAmount.max / 1000}k`}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">PKR Limit</p>
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Markup Rate" icon={<Percent className="w-4 h-4" />}>
                {products.map(p => (
                  <div key={p.id} className="text-center">
                    <p className="text-sm sm:text-lg font-bold text-smeda-blue">{p.markup}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Annual rate</p>
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Sectors" icon={<Building2 className="w-4 h-4" />}>
                {products.map(p => (
                  <div key={p.id} className="flex flex-wrap justify-center gap-1 sm:gap-1.5 px-2 sm:px-4">
                    {p.sectors.map(s => (
                      <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] sm:text-[10px] font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Cities" icon={<MapPin className="w-4 h-4" />}>
                {products.map(p => (
                  <div key={p.id} className="text-center px-2 sm:px-4">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-600 leading-tight">
                      {p.cities.slice(0, 3).join(', ')}{p.cities.length > 3 ? '...' : ''}
                    </p>
                  </div>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Last Updated" icon={<Calendar className="w-4 h-4" />}>
                {products.map(p => (
                  <div key={p.id} className="text-center">
                    <p className="text-xs sm:text-sm font-bold text-slate-700">{p.lastUpdated}</p>
                  </div>
                ))}
              </ComparisonRow>

              <div className="grid grid-cols-4 gap-4 sm:gap-8 mt-8 sm:mt-12 py-6 sm:py-8 bg-slate-50/50 rounded-2xl sm:rounded-3xl border border-slate-100">
                <div />
                {products.map(p => (
                  <div key={p.id} className="text-center px-2 sm:px-4">
                    <Link 
                      href={`/apply/${p.id}`}
                      className="inline-block w-full bg-smeda-blue text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold shadow-lg shadow-blue-500/10 hover:bg-blue-800 transition-all"
                    >
                      Apply
                    </Link>
                    <Link 
                      href={`/products/${p.id}`}
                      className="mt-2 text-[8px] sm:text-[10px] font-bold text-slate-400 hover:text-smeda-blue uppercase tracking-widest block"
                    >
                      Details
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
    <div className="grid grid-cols-4 gap-8 py-8 border-b border-slate-50 items-center hover:bg-slate-50/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 text-smeda-blue rounded-lg">
          {icon}
        </div>
        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      </div>
      {children}
    </div>
  );
}

function DollarSign(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
}

function Percent(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="17" cy="7" r="3"></circle><circle cx="7" cy="17" r="3"></circle></svg>;
}

function Calendar(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
}
