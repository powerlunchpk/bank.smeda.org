'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import ContactUs from '@/components/sections/ContactUs';
import { Search, ArrowRightLeft, UserCheck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useSettings } from '@/lib/context/SettingsContext';

export default function HowItWorks() {
  const { t } = useSettings();

  return (
    <main className="min-h-screen bg-card-bg transition-colors">
      <Header />
      
      {/* Aesthetic Header */}
      <section className="py-24 bg-page-bg border-b border-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-text-main mb-6 tracking-tight leading-tight transition-colors">
                {t.howItWorks.title}
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed transition-colors">
                {t.howItWorks.subtitle}
            </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-40">
             <JourneyStep 
                index="01"
                title={t.howItWorks.step1Title}
                desc={t.howItWorks.step1Desc}
                icon={<Search className="w-10 h-10" />}
                image="https://picsum.photos/seed/banking_search/800/600"
                learnMoreLabel={t.howItWorks.learnMore}
                dir={t.dir as 'ltr' | 'rtl'}
             />

             <JourneyStep 
                index="02"
                reversed
                title={t.howItWorks.step2Title}
                desc={t.howItWorks.step2Desc}
                icon={<ArrowRightLeft className="w-10 h-10" />}
                image="https://picsum.photos/seed/finance_compare/800/600"
                learnMoreLabel={t.howItWorks.learnMore}
                dir={t.dir as 'ltr' | 'rtl'}
             />

             <JourneyStep 
                index="03"
                title={t.howItWorks.step3Title}
                desc={t.howItWorks.step3Desc}
                icon={<ShieldCheck className="w-10 h-10" />}
                image="https://picsum.photos/seed/business_apply/800/600"
                learnMoreLabel={t.howItWorks.learnMore}
                dir={t.dir as 'ltr' | 'rtl'}
             />

             <JourneyStep 
                index="04"
                reversed
                title={t.howItWorks.step4Title}
                desc={t.howItWorks.step4Desc}
                icon={<UserCheck className="w-10 h-10" />}
                image="https://picsum.photos/seed/banking_approved/800/600"
                learnMoreLabel={t.howItWorks.learnMore}
                dir={t.dir as 'ltr' | 'rtl'}
             />
          </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white text-center shadow-inner relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 relative z-10">
              <h2 className="text-4xl text-white font-display font-bold mb-6 leading-tight">{t.howItWorks.ctaTitle}</h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">{t.howItWorks.ctaSubtitle}</p>
              <Link href="/" className="bg-white text-primary px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all inline-block shadow-2xl">
                 {t.howItWorks.ctaButton}
              </Link>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-[120px]" />
      </section>

      <ContactUs />
    </main>
  );
}

function JourneyStep({ 
  index, 
  title, 
  desc, 
  icon, 
  image, 
  reversed = false, 
  learnMoreLabel,
  dir
}: { 
  index: string, 
  title: string, 
  desc: string, 
  icon: React.ReactNode, 
  image: string, 
  reversed?: boolean,
  learnMoreLabel: string,
  dir: 'ltr' | 'rtl'
}) {
  return (
    <div className={`flex flex-col items-center gap-16 lg:gap-24 ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
       <div className="w-full lg:w-1/2 space-y-8">
          <div className="flex items-center gap-6">
             <span className="text-4xl lg:text-6xl font-black text-text-muted/10 italic tracking-tighter transition-colors">{index}</span>
             <div className="h-0.5 flex-grow bg-border transition-colors" />
          </div>
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center shadow-inner transition-colors">
             {icon}
          </div>
          <h3 className="text-4xl text-text-main leading-tight transition-colors">{title}</h3>
          <p className="text-lg text-text-muted leading-relaxed max-w-lg transition-colors">{desc}</p>
          <div className="flex items-center gap-2 text-primary font-bold group cursor-pointer hover:underline underline-offset-4 transition-all">
             {learnMoreLabel} <div className={`p-1 bg-primary/10 rounded group-hover:${dir === 'rtl' ? '-translate-x-1' : 'translate-x-1'} transition-transform`}>{dir === 'rtl' ? '←' : '→'}</div>
          </div>
       </div>
       <div className="w-full lg:w-1/2 relative group">
          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border border-border transition-colors">
             <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
          </div>
          <div className={`absolute -top-10 ${reversed ? '-left-10' : '-right-10'} w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10`} />
       </div>
    </div>
  );
}

