'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import ContactUs from '@/components/sections/ContactUs';
import { Gavel, Download, ShieldAlert } from 'lucide-react';

import { useSettings } from '@/lib/context/SettingsContext';

export default function Directives() {
  const { t } = useSettings();

  return (
    <main className="min-h-screen bg-page-bg transition-colors">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
             <div className="sticky top-32">
                <div className="w-16 h-16 bg-card-bg rounded-2xl shadow-sm border border-border flex items-center justify-center text-primary mb-8 transition-colors">
                   <Gavel className="w-8 h-8" />
                 </div>
                <h1 className="text-4xl font-display font-bold text-text-main mb-6 leading-tight transition-colors">{t.directives.title}</h1>
                <p className="text-text-muted leading-relaxed mb-8 transition-colors">
                   {t.directives.subtitle}
                </p>
                <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 text-primary text-sm font-bold flex items-center gap-3 transition-colors">
                   <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                   {t.directives.recentUpdate}
                </div>
             </div>
          </div>
          
          <div className="flex-grow space-y-6">
             <DirectiveItem 
                date="25 April 2025"
                title={t.directives.d1Title}
                desc={t.directives.d1Desc}
                label={t.directives.regulatory}
             />
             <DirectiveItem 
                date="10 April 2025"
                title={t.directives.d2Title}
                desc={t.directives.d2Desc}
                label={t.directives.regulatory}
             />
             <DirectiveItem 
                date="02 March 2025"
                title={t.directives.d3Title}
                desc={t.directives.d3Desc}
                label={t.directives.regulatory}
             />
             <DirectiveItem 
                date="15 Feb 2025"
                title={t.directives.d4Title}
                desc={t.directives.d4Desc}
                label={t.directives.regulatory}
             />
             <DirectiveItem 
                date="20 Jan 2025"
                title={t.directives.d5Title}
                desc={t.directives.d5Desc}
                label={t.directives.regulatory}
             />
          </div>
        </div>
      </div>

      <ContactUs />
    </main>
  );
}

function DirectiveItem({ date, title, desc, label }: { date: string, title: string, desc: string, label: string }) {
  return (
    <div className="p-8 bg-card-bg rounded-3xl border border-border shadow-sm hover:shadow-lg transition-all group flex items-start justify-between gap-8">
       <div className="space-y-4">
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{date}</span>
             <div className="w-1 h-1 bg-border rounded-full" />
             <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{label}</span>
          </div>
          <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-text-muted leading-relaxed max-w-2xl">{desc}</p>
       </div>
       <button className="flex-shrink-0 p-4 bg-page-bg text-text-muted hover:text-primary hover:bg-primary/10 hover:border-primary/20 rounded-2xl border border-border transition-all self-center group">
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
       </button>
    </div>
  );
}

