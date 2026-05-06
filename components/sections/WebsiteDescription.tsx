'use client';

import React from 'react';
import Image from 'next/image';
import { Info, TrendingUp, ShieldCheck } from 'lucide-react';

import { useSettings } from '@/lib/context/SettingsContext';

export default function WebsiteDescription() {
  const { t } = useSettings();
  
  return (
    <section className="py-20 bg-card-bg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-20">
              <Image
                src="https://picsum.photos/seed/banking_business/800/800"
                alt="SME Business Owners"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Aesthetic Accents */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-48 h-48 border-4 border-primary/5 bg-transparent rounded-3xl -z-10" />
            
            {/* Stat Card */}
            <div className="absolute top-10 -right-10 z-30 bg-card-bg p-6 rounded-2xl shadow-xl border border-border flex items-center gap-4 transition-colors">
              <div className="p-3 bg-green-500/10 text-green-600 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-tighter">{t.about.successRate}</p>
                <p className="text-xl font-black text-text-main">+85%</p>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Info className="w-3.5 h-3.5" />
              <span>{t.about.tag}</span>
            </div>
            <h2 className="text-4xl text-text-main mb-8 leading-tight font-display font-bold">
              {t.about.title}
            </h2>
            <div className="space-y-6 text-text-muted leading-relaxed font-medium">
              <p>{t.about.desc1}</p>
              <p>{t.about.desc2}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <div className="p-4 rounded-2xl border border-border bg-page-bg/50 group transition-colors hover:border-primary/30">
                <div className="w-10 h-10 bg-card-bg rounded-xl shadow-sm flex items-center justify-center text-primary mb-4 transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-text-main text-sm mb-2 uppercase tracking-wide">{t.about.govBacked}</h4>
                <p className="text-xs text-text-muted leading-relaxed">{t.about.govDesc}</p>
              </div>
              <div className="p-4 rounded-2xl border border-border bg-page-bg/50 group transition-colors hover:border-primary/30">
                <div className="w-10 h-10 bg-card-bg rounded-xl shadow-sm flex items-center justify-center text-primary mb-4 transition-colors">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-text-main text-sm mb-2 uppercase tracking-wide">{t.about.growth}</h4>
                <p className="text-xs text-text-muted leading-relaxed">{t.about.growthDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
