'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Percent, Calendar, DollarSign, ArrowRight, RefreshCcw } from 'lucide-react';

export default function LoanCalculator() {
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
    <section className="py-20 bg-smeda-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-400/20 text-blue-100 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Calculator className="w-3.5 h-3.5" />
              <span>Smart Planning Tool</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Estimate Your Monthly Loan Payments
            </h2>
            <p className="text-lg text-blue-100/80 mb-8 max-w-lg leading-relaxed">
              Use our quick loan calculator to plan your business finances. Just enter your requirements and see your estimated monthly installments.
            </p>
            
            <div className="grid grid-cols-2 gap-6 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <div>
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Monthly EMI</p>
                <p className="text-3xl font-black">PKR {emi.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Total Interest</p>
                <p className="text-3xl font-black">PKR {totalInterest.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 border border-blue-100">
            <div className="space-y-8">
              {/* Amount */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-smeda-blue" />
                    Loan Amount
                  </label>
                  <span className="text-lg font-bold text-smeda-blue">PKR {amount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="50000000"
                  step="100000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-smeda-blue"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Percent className="w-4 h-4 text-smeda-blue" />
                    Interest Rate (Annual)
                  </label>
                  <span className="text-lg font-bold text-smeda-blue">{rate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-smeda-blue"
                />
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-smeda-blue" />
                    Loan Tenure (Years)
                  </label>
                  <span className="text-lg font-bold text-smeda-blue">{tenure} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-smeda-blue"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <Link 
                  href="/#products"
                  className="flex-grow bg-smeda-blue text-white py-4 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  Find a Loan <ArrowRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => { setAmount(1000000); setRate(12); setTenure(5); }}
                  className="p-4 bg-slate-50 text-slate-400 hover:text-smeda-blue hover:bg-slate-100 rounded-2xl transition-all"
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
