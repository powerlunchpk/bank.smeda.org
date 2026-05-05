'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import ContactUs from '@/components/sections/ContactUs';
import { 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  PieChart, 
  Globe2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SBPPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Dynamic Header */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://picsum.photos/seed/sbpbg/1920/800" alt="SBP" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Central Bank Initiatives</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-display font-bold mb-6 leading-tight">
                    State Bank of Pakistan (SBP) <br className="hidden md:block" /> Financing Schemes
                </h1>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                    Enabling economic growth through subsidized refinancing and credit guarantee schemes for target sectors.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-smeda-blue px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all">
                    View All Schemes <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
            </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
               <div>
                  <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">Scheme Description</h2>
                  <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                    <p>
                        The State Bank of Pakistan (SBP) offers various schemes aimed at providing affordable financing to SMEs, promoting economic growth and development. These schemes include subsidized loans, refinancing options, and credit guarantees, designed to support businesses in sectors such as manufacturing, agriculture, and services.
                    </p>
                    <p>
                        SBP&apos;s goal is to ensure that SMEs, which are the backbone of Pakistan&apos;s economy, have access to the necessary capital at subsidized rates through commercial and specialized banks.
                    </p>
                  </div>

                  <div className="mt-12 space-y-4">
                     <SchemeType icon={<PieChart className="w-5 h-5" />} title="Refinance Facility for SMEs" desc="Provides long-term financing for purchase of local and imported machinery." />
                     <SchemeType icon={<Globe2 className="w-5 h-5" />} title="Export Finance Scheme" desc="Specifically designed to assist exporters in meeting their working capital requirements." />
                     <SchemeType icon={<Building2 className="w-5 h-5" />} title="SME Asaan Finance (SAAF)" desc="Collateral-free financing for small businesses through selected banks." />
                  </div>
               </div>

               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 space-y-8">
                  <h3 className="text-xl font-bold text-slate-900">Key Benefits</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <BenefitCard title="Fixed Markups" desc="Predetermined rates that remain stable throughout tenure." />
                    <BenefitCard title="Priority Sectors" desc="Extra support for IT, Women, and Renewable Energy." />
                    <BenefitCard title="Easy Collateral" desc="Relaxed security requirements for small facilities." />
                    <BenefitCard title="Long Tenure" desc="Up to 10 years for infrastructure projects." />
                  </div>
                  
                  <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Allocated</span>
                        <span className="text-2xl font-black text-smeda-blue">PKR 100B+</span>
                     </div>
                     <Link href="#" className="flex items-center gap-2 text-smeda-blue font-bold text-sm hover:underline">
                        Download Policy Document <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
               </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-12">How to Access SBP Schemes</h2>
            <div className="grid md:grid-cols-4 gap-8">
               <Step icon="1" text="Visit any partner commercial bank branch" />
               <Step icon="2" text="Request for specific SBP Refinance Scheme" />
               <Step icon="3" text="Submit necessary business documents" />
               <Step icon="4" text="Bank evaluates and processes via SBP" />
            </div>
         </div>
      </section>

      <ContactUs />
    </main>
  );
}

function SchemeType({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-default">
       <div className="w-12 h-12 bg-blue-50 text-smeda-blue rounded-xl flex items-center justify-center flex-shrink-0">
          {icon}
       </div>
       <div>
          <h4 className="font-bold text-slate-800 text-sm mb-1">{title}</h4>
          <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}

function BenefitCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
       <h4 className="text-xs font-bold text-smeda-blue uppercase mb-2">{title}</h4>
       <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function Step({ icon, text }: { icon: string, text: string }) {
  return (
    <div className="flex flex-col items-center">
       <div className="w-10 h-10 bg-smeda-blue text-white rounded-full flex items-center justify-center font-bold mb-4 shadow-lg shadow-blue-500/20">
          {icon}
       </div>
       <p className="text-xs font-bold text-slate-700 leading-relaxed max-w-[150px]">{text}</p>
    </div>
  );
}
