'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { BankingProduct } from '@/lib/types';

interface ProductCardProps {
  product: BankingProduct;
  isCompared: boolean;
  onCompareToggle: (product: BankingProduct) => void;
  disabled: boolean;
}

export default function ProductCard({ product, isCompared, onCompareToggle, disabled }: ProductCardProps) {
  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 group ${isCompared ? 'border-smeda-blue ring-1 ring-smeda-blue/10 bg-blue-50/10 shadow-lg' : 'border-slate-200 hover:border-smeda-blue/20 hover:shadow-xl hover:shadow-slate-200/50'}`}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Side Info */}
          <div className="md:w-48 flex-shrink-0 flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 p-3 mb-4 overflow-hidden flex items-center justify-center shadow-inner">
              <Image
                src={product.bankLogo}
                alt={product.bankName}
                width={60}
                height={60}
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[.2em] mb-1">Last Updated</p>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{product.lastUpdated}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-smeda-blue transition-colors mb-1">
                  {product.productName}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-smeda-blue">{product.bankName}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{product.cities[0]}{product.cities.length > 1 ? ` +${product.cities.length - 1}` : ''}</span>
                  </div>
                </div>
              </div>

              {/* Compare Toggle */}
              <label className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all cursor-pointer ${isCompared ? 'bg-smeda-blue border-smeda-blue text-white shadow-md cursor-default' : disabled ? 'opacity-50 grayscale cursor-not-allowed border-slate-100 bg-slate-50' : 'bg-white border-slate-100 hover:border-smeda-blue/30'}`}>
                {isCompared ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-md border-2 border-slate-200" />}
                <span className="text-xs font-bold uppercase tracking-widest">{isCompared ? 'Comparing' : 'Compare'}</span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isCompared}
                  disabled={disabled && !isCompared}
                  onChange={() => onCompareToggle(product)}
                />
              </label>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2 md:line-clamp-none">
              {product.description}
            </p>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div>
                <p className="text-[10px] font-bold text-slate-400 p-0 mb-1 uppercase tracking-wider">Loan Range</p>
                <p className="text-sm font-bold text-slate-800">
                  {product.loanAmount.max >= 1000000 ? `${(product.loanAmount.max / 1000000).toFixed(1)}M` : `${product.loanAmount.max / 1000}k`}
                  <span className="text-[10px] ml-1 font-medium">{product.loanAmount.currency}</span>
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 p-0 mb-1 uppercase tracking-wider">Markup Rate</p>
                <p className="text-sm font-bold text-slate-800">{product.markup}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 p-0 mb-1 uppercase tracking-wider">Processing Fee</p>
                <p className="text-sm font-bold text-slate-800">{product.serviceFees}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 p-0 mb-1 uppercase tracking-wider">Primary Sector</p>
                <p className="text-sm font-bold text-slate-800">{product.sectors[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            {product.purpose.slice(0, 2).map((p) => (
              <span key={p} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200">
                {p}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link 
              href={`/products/${product.id}`}
              className="flex-1 sm:flex-none text-center px-4 py-2 text-slate-500 font-bold text-sm hover:text-smeda-blue transition-colors"
            >
              Details
            </Link>
            <Link 
              href={`/apply/${product.id}`}
              className="flex-1 sm:flex-none bg-smeda-blue text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
            >
              Apply <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
