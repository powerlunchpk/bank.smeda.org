'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import ContactUs from '@/components/sections/ContactUs';
import { Search, ArrowRightLeft, FileCheck, CheckCircle2, Building2, UserCheck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Aesthetic Header */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 font-bold tracking-tight">
                Your Journey to Financial <br /> Empowerement
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                We make it easy for SMEs in Pakistan to navigate the complex banking world through our unified portal.
            </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-40">
             <JourneyStep 
                index="01"
                title="Discover & Search"
                desc="Browse the most comprehensive database of SME-specific loan products in Pakistan. Use our powerful search and smart filters to narrow down products that fit your business sector, required amount, and location."
                icon={<Search className="w-10 h-10" />}
                image="https://picsum.photos/seed/step1/800/600"
             />

             <JourneyStep 
                index="02"
                reversed
                title="Compare and Analyze"
                desc="Not sure which bank fits your needs? Use our Compare Tool to analyze up to 3 products side-by-side. Look at markup rates, loan tenures, and eligibility requirements without opening a dozen tabs."
                icon={<ArrowRightLeft className="w-10 h-10" />}
                image="https://picsum.photos/seed/step2/800/600"
             />

             <JourneyStep 
                index="03"
                title="Calculate and Plan"
                desc="Use our built-in Loan Calculator to estimate your monthly installments. Planning your repayment strategy upfront ensures business sustainability and prevents financial strain later."
                icon={<ShieldCheck className="w-10 h-10" />}
                image="https://picsum.photos/seed/step3/800/600"
             />

             <JourneyStep 
                index="04"
                reversed
                title="Apply & Fast-track"
                desc="Complete our unified application form and upload your documents securely. Your digital application is sent directly to the bank's SME relationship manager, bypassing general branch delays."
                icon={<UserCheck className="w-10 h-10" />}
                image="https://picsum.photos/seed/step4/800/600"
             />
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-smeda-blue text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-4xl font-display font-bold mb-6">Ready to scale your business?</h2>
              <p className="text-xl text-blue-100 mb-10">Start your search today and find the financial partner your business deserves.</p>
              <Link href="/" className="bg-white text-smeda-blue px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all inline-block shadow-2xl">
                 Start Exploring Products
              </Link>
          </div>
      </section>

      <ContactUs />
    </main>
  );
}

function JourneyStep({ index, title, desc, icon, image, reversed = false }: { index: string, title: string, desc: string, icon: React.ReactNode, image: string, reversed?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-16 lg:gap-24 ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
       <div className="w-full lg:w-1/2 space-y-8">
          <div className="flex items-center gap-6">
             <span className="text-4xl lg:text-6xl font-black text-slate-100 italic tracking-tighter">{index}</span>
             <div className="h-0.5 flex-grow bg-slate-50" />
          </div>
          <div className="w-20 h-20 bg-blue-50 text-smeda-blue rounded-3xl flex items-center justify-center shadow-inner">
             {icon}
          </div>
          <h3 className="text-4xl text-slate-900 leading-tight">{title}</h3>
          <p className="text-lg text-slate-500 leading-relaxed max-w-lg">{desc}</p>
          <div className="flex items-center gap-2 text-smeda-blue font-bold group cursor-pointer hover:underline underline-offset-4">
             Learn more about this step <div className="p-1 bg-blue-50 rounded group-hover:translate-x-1 transition-transform">→</div>
          </div>
       </div>
       <div className="w-full lg:w-1/2 relative group">
          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border border-slate-100">
             <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
          </div>
          <div className={`absolute -top-10 ${reversed ? '-left-10' : '-right-10'} w-64 h-64 bg-blue-50 rounded-full blur-[100px] -z-10`} />
       </div>
    </div>
  );
}
