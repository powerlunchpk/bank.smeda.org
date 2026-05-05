'use client';

import React from 'react';
import Image from 'next/image';
import { Info, TrendingUp, ShieldCheck } from 'lucide-react';

export default function WebsiteDescription() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-20">
              <Image
                src="https://picsum.photos/seed/smeda-about/800/800"
                alt="SME Business Owners"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Aesthetic Accents */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-100 rounded-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-48 h-48 border-4 border-blue-50 bg-transparent rounded-3xl -z-10" />
            
            {/* Stat Card */}
            <div className="absolute top-10 -right-10 z-30 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Success Rate</p>
                <p className="text-xl font-black text-slate-800">+85%</p>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Info className="w-3.5 h-3.5" />
              <span>About the Portal</span>
            </div>
            <h2 className="text-4xl text-slate-900 mb-8 leading-tight">
              A Comprehensive Platform for SME Financing in Pakistan
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
              <p>
                The SME Financing Products platform is designed to help small and medium-sized enterprises (SMEs) in Pakistan access detailed information about SME-specific loan products and financial services offered by various banks.
              </p>
              <p>
                Whether you&apos;re looking to expand your business or secure working capital, this platform provides easy access to a wide range of banking products, their eligibility criteria, documents required, and direct information regarding bank representatives.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">Government Backed</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Integrated with NBP, SBP and Prime Minister&apos;s Youth initiatives.</p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">Empowering Growth</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Helping thousands of SMEs make informed financial decisions daily.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
