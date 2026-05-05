'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import ContactUs from '@/components/sections/ContactUs';
import { ShieldCheck, Zap, ArrowRight, CheckCircle, Target, Users } from 'lucide-react';
import Image from 'next/image';

export default function PMYBLPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-smeda-blue overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://picsum.photos/seed/pmyhero/1920/600" alt="PMYBL" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/10">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Flagship Government Initiative</span>
            </div>
            <h1 className="text-4xl md:text-6xl text-white font-display font-bold mb-6">
                Prime Minister Youth Business & <br /> Agriculture Loan Scheme
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                Empowering the youth and farmers of Pakistan through accessible and subsidized financial assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <button className="bg-white text-smeda-blue px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all shadow-xl shadow-black/20">
                 Apply Now <ArrowRight className="w-4 h-4" />
               </button>
               <button className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all backdrop-blur-md">
                 Download Brochure
               </button>
            </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 mb-24">
               <FeatureCard 
                 icon={<Target className="w-8 h-8" />}
                 title="Target Audience"
                 desc="Entrepreneurs aged between 21 and 45 years and small-scale farmers looking to modernize operations."
               />
               <FeatureCard 
                 icon={<ShieldCheck className="w-8 h-8" />}
                 title="Tiered Loans"
                 desc="Loans ranging from PKR 0.5M up to PKR 7.5M with varying markup rates and easy repayment plans."
               />
               <FeatureCard 
                 icon={<Users className="w-8 h-8" />}
                 title="Inclusivity"
                 desc="Special focus on female entrepreneurs and individuals from underserved regions of Pakistan."
               />
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                   <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">Scheme Description</h2>
                   <div className="space-y-6 text-slate-600 leading-relaxed">
                     <p>
                       The Prime Minister&apos;s Youth Business and Agriculture Loan (PMYB&AL) Scheme provides financial assistance to young entrepreneurs and farmers in Pakistan. It offers subsidized loans for starting or expanding small businesses and agricultural ventures, helping empower the youth and promote economic self-reliance.
                     </p>
                     <p>
                       Unlike traditional banking products, this scheme features significantly lower markup rates (as low as 0% for Tier 1) and relaxed collateral requirements for smaller loans, making it accessible to those who are just starting their journey.
                     </p>
                   </div>
                   
                   <div className="mt-10 grid grid-cols-2 gap-4">
                      {['0% Markup on Tier 1', 'Quick Processing', '5-7 Year Tenure', 'Easy Installments'].map(item => (
                        <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                           <CheckCircle className="w-4 h-4 text-green-500" />
                           {item}
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative">
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-slate-200">
                    <Image src="https://picsum.photos/seed/pmy2/800/600" alt="Scheme Details" fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </div>
      </section>

      <ContactUs />
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-10 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
      <div className="w-16 h-16 bg-blue-50 text-smeda-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
