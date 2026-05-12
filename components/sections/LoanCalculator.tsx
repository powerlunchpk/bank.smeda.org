'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Percent, Calendar, DollarSign, ArrowRight, RefreshCcw } from 'lucide-react';

import { useSettings } from '@/lib/context/SettingsContext';

export default function LoanCalculator() {
  const { t } = useSettings();
  const [amount, setAmount] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(12);
  const [tenure, setTenure] = useState<number>(5);

  const calculateEMI = () => {
    const p = amount;
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isFinite(emi) ? Math.round(emi) : 0;
  };

  const emi = calculateEMI();
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - amount;

  return (
    <section className="py-20 bg-primary transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.calculator.planningTool}</span>
            </div>
            <h2 className="text-4xl text-white md:text-5xl font-display font-bold mb-6 leading-tight">
              {t.calculator.title}
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
              {t.calculator.subtitle}
            </p>
            
            <div className="grid grid-cols-2 gap-6 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">{t.calculator.emi}</p>
                <p className="text-3xl font-black">{t.calculator.pkr} {emi.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">{t.calculator.totalInterest}</p>
                <p className="text-3xl font-black">{t.calculator.pkr} {totalInterest.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-card-bg rounded-[2rem] shadow-2xl p-8 md:p-10 border border-border transition-colors">
            <div className="space-y-8">
              {/* Amount */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary transition-colors" />
                    {t.calculator.amount}
                  </label>
                  <span className="text-lg font-bold text-primary transition-colors">{t.calculator.pkr} {amount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="50000000"
                  step="100000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-page-bg rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                    <Percent className="w-4 h-4 text-primary transition-colors" />
                    {t.calculator.rate}
                  </label>
                  <span className="text-lg font-bold text-primary transition-colors">{rate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-page-bg rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary transition-colors" />
                    {t.calculator.tenure}
                  </label>
                  <span className="text-lg font-bold text-primary transition-colors">{tenure} {t.calculator.years}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-page-bg rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <Link 
                  href="/#products"
                  className="flex-grow bg-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {t.calculator.findLoan} <ArrowRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => { setAmount(1000000); setRate(12); setTenure(5); }}
                  className="p-4 bg-page-bg text-text-muted hover:text-primary hover:bg-page-bg transition-all rounded-2xl"
                >
                  <RefreshCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
