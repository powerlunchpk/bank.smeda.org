'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import ContactUs from '@/components/sections/ContactUs';
import { Gavel, Download, ShieldAlert } from 'lucide-react';

export default function Directives() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
             <div className="sticky top-32">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-smeda-blue mb-8">
                   <Gavel className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">Banking & SME Directives</h1>
                <p className="text-slate-500 leading-relaxed mb-8">
                   Stay updated with the latest circulars and regulatory directives issued by the State Bank of Pakistan and Ministry of Industries.
                </p>
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-smeda-blue text-sm font-bold flex items-center gap-3">
                   <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                   Recent Update: SME Policy 2024 enacted.
                </div>
             </div>
          </div>
          
          <div className="flex-grow space-y-6">
             <DirectiveItem 
                date="25 April 2025"
                title="Revised PRs for SME Financing"
                desc="Detailed Prudential Regulations for Small and Medium Enterprises with updated collateral limits."
             />
             <DirectiveItem 
                date="10 April 2025"
                title="SBP Circular on SAAF Subsidies"
                desc="Procedural changes for SME Asaan Finance scheme allocations for private banks."
             />
             <DirectiveItem 
                date="02 March 2025"
                title="Electronic CIB Guideline Update"
                desc="Updated reporting requirements for small business credit facilities."
             />
             <DirectiveItem 
                date="15 Feb 2025"
                title="Anti-Money Laundering Compliance"
                desc="KYC requirements specifically tailored for small wholesale businesses."
             />
             <DirectiveItem 
                date="20 Jan 2025"
                title="SME Classification Thresholds"
                desc="Revised definitions for what constitutes a 'Medium' enterprise based on turnover."
             />
          </div>
        </div>
      </div>

      <ContactUs />
    </main>
  );
}

function DirectiveItem({ date, title, desc }: { date: string, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex items-start justify-between gap-8">
       <div className="space-y-4">
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{date}</span>
             <div className="w-1 h-1 bg-slate-200 rounded-full" />
             <span className="text-[10px] font-bold text-smeda-blue uppercase tracking-widest">Regulatory</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-smeda-blue transition-colors">{title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{desc}</p>
       </div>
       <button className="flex-shrink-0 p-4 bg-slate-50 text-slate-400 hover:text-smeda-blue hover:bg-blue-50 hover:border-blue-100 rounded-2xl border border-slate-100 transition-all self-center group">
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
       </button>
    </div>
  );
}
