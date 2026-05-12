'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { BankingProduct } from '@/lib/types';
import { useSettings } from '@/lib/context/SettingsContext';

interface ProductCardProps {
  product: BankingProduct;
  isCompared: boolean;
  onCompareToggle: (product: BankingProduct) => void;
  disabled: boolean;
}

export default function ProductCard({ product, isCompared, onCompareToggle, disabled }: ProductCardProps) {
  const { t } = useSettings();

  return (
    <div className={`bg-card-bg rounded-2xl border transition-all duration-300 group ${isCompared ? 'border-primary ring-1 ring-primary/10 bg-primary/5 shadow-lg' : 'border-border hover:border-primary/20 hover:shadow-xl'}`}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Side Info */}
          <div className="md:w-48 flex-shrink-0 flex flex-col items-center">
            <div className="relative w-20 h-20 rounded-2xl bg-page-bg border border-border p-3 mb-4 overflow-hidden flex items-center justify-center shadow-inner">
              <Image
                src={product.bankLogo}
                alt={product.bankName}
                width={60}
                height={60}
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-[.2em] mb-1">{t.products.lastUpdated}</p>
            <div className="flex items-center gap-1.5 text-text-muted">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{product.lastUpdated}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors mb-1">
                  {product.productName}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-primary">{product.bankName}</span>
                  <span className="w-1 h-1 bg-border rounded-full" />
                  <div className="flex items-center gap-1 text-text-muted">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{product.cities[0]}{product.cities.length > 1 ? ` +${product.cities.length - 1}` : ''}</span>
                  </div>
                </div>
              </div>

              {/* Compare Toggle */}
              <label className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all cursor-pointer ${isCompared ? 'bg-primary border-primary text-white shadow-md cursor-default' : disabled ? 'opacity-50 grayscale cursor-not-allowed border-border/50 bg-page-bg' : 'bg-card-bg border-border hover:border-primary/30'}`}>
                {isCompared ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-md border-2 border-border" />}
                <span className="text-xs font-bold uppercase tracking-widest">{isCompared ? t.products.comparing : t.products.compare}</span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isCompared}
                  disabled={disabled && !isCompared}
                  onChange={() => onCompareToggle(product)}
                />
              </label>
            </div>

            <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-2 md:line-clamp-none">
              {product.description}
            </p>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-page-bg/50 p-4 rounded-xl border border-border">
              <div>
                <p className="text-[10px] font-bold text-text-muted p-0 mb-1 uppercase tracking-wider">{t.products.loanRange}</p>
                <p className="text-sm font-bold text-text-main">
                  {product.loanAmount.max >= 1000000 ? `${(product.loanAmount.max / 1000000).toFixed(1)}M` : `${product.loanAmount.max / 1000}k`}
                  <span className="text-[10px] ml-1 font-medium">{product.loanAmount.currency}</span>
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted p-0 mb-1 uppercase tracking-wider">{t.products.markup}</p>
                <p className="text-sm font-bold text-text-main">{product.markup}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted p-0 mb-1 uppercase tracking-wider">{t.products.fee}</p>
                <p className="text-sm font-bold text-text-main">{product.serviceFees}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-muted p-0 mb-1 uppercase tracking-wider">{t.products.sectorLabel}</p>
                <p className="text-sm font-bold text-text-main">{product.sectors[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2 text-text-main">
            {product.purpose.slice(0, 2).map((p) => (
              <span key={p} className="px-3 py-1 bg-page-bg rounded-lg text-[10px] font-bold border border-border">
                {p}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link 
              href={`/products/${product.id}`}
              className="flex-1 sm:flex-none text-center px-4 py-2 text-text-muted font-bold text-sm hover:text-primary transition-colors"
            >
              {t.products.details}
            </Link>
            <Link 
              href={`/apply/${product.id}`}
              className="flex-1 sm:flex-none bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
            >
              {t.products.apply} <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
