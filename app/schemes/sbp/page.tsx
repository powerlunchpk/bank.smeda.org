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

import { useSettings } from '@/lib/context/SettingsContext';

export default function SBPPage() {
  const { t } = useSettings();

  return (
    <main className="min-h-screen bg-page-bg transition-colors">
      <Header />
      
      {/* Dynamic Header */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://picsum.photos/seed/sbpbg/1920/800" alt="SBP" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.sbp.tag}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-display font-bold mb-6 leading-tight">
                    {t.sbp.title}
                </h1>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                    {t.sbp.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-primary px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all shadow-xl shadow-black/20">
                    {t.sbp.viewAll} <ArrowRight className={`w-4 h-4 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
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
                  <h2 className="text-3xl font-display font-bold text-text-main mb-8 transition-colors">{t.sbp.descriptionTitle}</h2>
                  <div className="space-y-6 text-text-muted leading-relaxed text-lg transition-colors">
                    <p>{t.sbp.description1}</p>
                    <p>{t.sbp.description2}</p>
                  </div>

                  <div className="mt-12 space-y-4">
                     <SchemeType icon={<PieChart className="w-5 h-5" />} title={t.sbp.refinanceTitle} desc={t.sbp.refinanceDesc} />
                     <SchemeType icon={<Globe2 className="w-5 h-5" />} title={t.sbp.exportTitle} desc={t.sbp.exportDesc} />
                     <SchemeType icon={<Building2 className="w-5 h-5" />} title={t.sbp.saafTitle} desc={t.sbp.saafDesc} />
                  </div>
               </div>

               <div className="bg-card-bg rounded-3xl border border-border shadow-sm p-10 space-y-8 transition-colors">
                  <h3 className="text-xl font-bold text-text-main transition-colors">{t.sbp.benefitsTitle}</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <BenefitCard title={t.sbp.benefit1Title} desc={t.sbp.benefit1Desc} />
                    <BenefitCard title={t.sbp.benefit2Title} desc={t.sbp.benefit2Desc} />
                    <BenefitCard title={t.sbp.benefit3Title} desc={t.sbp.benefit3Desc} />
                    <BenefitCard title={t.sbp.benefit4Title} desc={t.sbp.benefit4Desc} />
                  </div>
                  
                  <div className="pt-8 border-t border-border flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">{t.sbp.totalAllocated}</span>
                        <span className="text-2xl font-black text-primary transition-colors">PKR 100B+</span>
                     </div>
                     <Link href="#" className="flex items-center gap-2 text-primary font-bold text-sm hover:underline transition-all">
                        {t.sbp.downloadPolicy} <ArrowRight className={`w-4 h-4 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
                     </Link>
                  </div>
               </div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-page-bg border-y border-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display font-bold text-text-main mb-12 transition-colors">{t.sbp.howToTitle}</h2>
            <div className="grid md:grid-cols-4 gap-8">
               <Step icon="1" text={t.sbp.step1} />
               <Step icon="2" text={t.sbp.step2} />
               <Step icon="3" text={t.sbp.step3} />
               <Step icon="4" text={t.sbp.step4} />
            </div>
         </div>
      </section>

      <ContactUs />
    </main>
  );
}

function SchemeType({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl hover:bg-card-bg hover:shadow-md transition-all cursor-default border border-transparent hover:border-border group">
       <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
          {icon}
       </div>
       <div>
          <h4 className="font-bold text-text-main text-sm mb-1 group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-xs text-text-muted leading-relaxed transition-colors">{desc}</p>
       </div>
    </div>
  );
}

function BenefitCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-4 bg-page-bg rounded-xl border border-border transition-colors group hover:border-primary/30">
       <h4 className="text-xs font-bold text-primary uppercase mb-2 tracking-tight transition-colors">{title}</h4>
       <p className="text-[10px] text-text-muted leading-relaxed font-medium transition-colors">{desc}</p>
    </div>
  );
}

function Step({ icon, text }: { icon: string, text: string }) {
  return (
    <div className="flex flex-col items-center">
       <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4 shadow-lg shadow-primary/20">
          {icon}
       </div>
       <p className="text-xs font-bold text-text-main leading-relaxed max-w-[150px] transition-colors">{text}</p>
    </div>
  );
}

