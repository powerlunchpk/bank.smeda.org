'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function IncentiveCards() {
  return (
    <section className="py-20 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[100px] -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* SBP Scheme */}
          <div className="group relative">
            <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="https://picsum.photos/seed/sbp/800/600"
                alt="SBP Incentive Schemes"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Central Bank Verified</span>
                </div>
                <h3 className="text-3xl text-white mb-4">State Bank of Pakistan (SBP) Incentive Schemes</h3>
                <p className="text-slate-300 mb-8 max-w-md line-clamp-3">
                  Affordable financing schemes aimed at promoting economic growth. Includes subsidized loans, refinancing options, and credit guarantees.
                </p>
                <button className="self-start px-8 py-3 bg-white text-smeda-blue rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-2">
                  Explore Schemes <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* PMYBL Scheme */}
          <div className="group relative">
            <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="https://picsum.photos/seed/pmy/800/600"
                alt="PMYB&ALS"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Flagship Initiative</span>
                </div>
                <h3 className="text-3xl text-white mb-4">PM Youth Business & Agriculture Loan Scheme</h3>
                <p className="text-slate-300 mb-8 max-w-md line-clamp-3">
                  Financial assistance to young entrepreneurs and farmers. Subsidized loans for starting or expanding ventures with easy repayment terms.
                </p>
                <button className="self-start px-8 py-3 bg-smeda-accent text-white rounded-full font-bold hover:bg-blue-400 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
                  Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionBottom() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex items-center gap-6">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
        Government of Pakistan <div className="w-1 h-1 bg-slate-300 rounded-full" />
      </span>
      <div className="flex items-center gap-2 text-slate-400">
        <span className="text-xs font-semibold underline decoration-slate-700 underline-offset-4">Prime Minister&apos;s Youth Initiatives</span>
      </div>
    </div>
  );
}
