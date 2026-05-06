'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useSettings } from '@/lib/context/SettingsContext';
import { translations } from '@/lib/i18n';

export default function IncentiveCards() {
  const { t } = useSettings();

  return (
    <section className="py-20 bg-text-main overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[100px] -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* SBP Scheme */}
          <div className="group relative">
            <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="https://picsum.photos/seed/central_bank/800/600"
                alt={t.incentives.sbpTitle}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">{t.incentives.sbpTag}</span>
                </div>
                <h3 className="text-3xl text-white mb-4 font-display font-bold">{t.incentives.sbpTitle}</h3>
                <p className="text-white/70 mb-8 max-w-md line-clamp-3">
                  {t.incentives.sbpDesc}
                </p>
                <button className="self-start px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-page-bg transition-all flex items-center gap-2">
                  {t.incentives.explore} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* PMYBL Scheme */}
          <div className="group relative">
            <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="https://picsum.photos/seed/youth_business/800/600"
                alt={t.incentives.pmTitle}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">{t.incentives.pmTag}</span>
                </div>
                <h3 className="text-3xl text-white mb-4 font-display font-bold">{t.incentives.pmTitle}</h3>
                <p className="text-white/70 mb-8 max-w-md line-clamp-3">
                  {t.incentives.pmDesc}
                </p>
                <button className="self-start px-8 py-3 bg-primary text-white rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                  {t.incentives.apply} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <SectionBottom t={t} />
      </div>
    </section>
  );
}

function SectionBottom({ t }: { t: typeof translations.en }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
        {t.incentives.govPak} <div className="hidden sm:block w-1 h-1 bg-white/20 rounded-full" />
      </span>
      <div className="flex items-center gap-2 text-white/40">
        <span className="text-xs font-semibold underline decoration-white/20 underline-offset-4">{t.incentives.pmInitiatives}</span>
      </div>
    </div>
  );
}
