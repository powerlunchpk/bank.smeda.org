'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import ContactUs from '@/components/sections/ContactUs';
import { ShieldCheck, Zap, ArrowRight, CheckCircle, Target, Users } from 'lucide-react';
import Image from 'next/image';

import { useSettings } from '@/lib/context/SettingsContext';

export default function PMYBLPage() {
  const { t } = useSettings();

  return (
    <main className="min-h-screen bg-page-bg transition-colors">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://picsum.photos/seed/pmyhero/1920/600" alt="PMYBL" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md border border-white/10 transition-colors">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>{t.pmyb.tag}</span>
            </div>
            <h1 className="text-4xl md:text-6xl text-white font-display font-bold mb-6 leading-tight">
                {t.pmyb.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors">
                {t.pmyb.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <button className="bg-white text-primary px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all shadow-xl shadow-black/20">
                 {t.pmyb.applyNow} <ArrowRight className={`w-4 h-4 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
               </button>
               <button className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all backdrop-blur-md">
                 {t.pmyb.downloadBrochure}
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
                 title={t.pmyb.audienceTitle}
                 desc={t.pmyb.audienceDesc}
               />
               <FeatureCard 
                 icon={<ShieldCheck className="w-8 h-8" />}
                 title={t.pmyb.tieredTitle}
                 desc={t.pmyb.tieredDesc}
               />
               <FeatureCard 
                 icon={<Users className="w-8 h-8" />}
                 title={t.pmyb.inclusivityTitle}
                 desc={t.pmyb.inclusivityDesc}
               />
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                   <h2 className="text-3xl font-display font-bold text-text-main mb-8 transition-colors">{t.pmyb.descriptionTitle}</h2>
                   <div className="space-y-6 text-text-muted leading-relaxed transition-colors">
                     <p>{t.pmyb.description1}</p>
                     <p>{t.pmyb.description2}</p>
                   </div>
                   
                   <div className="mt-10 grid grid-cols-2 gap-4">
                      {[t.pmyb.bullet1, t.pmyb.bullet2, t.pmyb.bullet3, t.pmyb.bullet4].map(item => (
                        <div key={item} className="flex items-center gap-2 text-sm font-bold text-text-main transition-colors">
                           <CheckCircle className="w-4 h-4 text-green-500" />
                           {item}
                        </div>
                      ))}
                   </div>
                </div>
                <div className="relative">
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-border transition-colors">
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
    <div className="p-10 bg-card-bg rounded-3xl border border-border shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all group">
      <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-text-main mb-4 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed transition-colors">{desc}</p>
    </div>
  );
}

