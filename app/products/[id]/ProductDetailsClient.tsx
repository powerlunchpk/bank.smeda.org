'use client';

import React from 'react';
import { BankingProduct } from '@/lib/types';
import Header from '@/components/layout/Header';
import ContactUs from '@/components/sections/ContactUs';
import { 
  CheckCircle2, 
  FileText, 
  Phone, 
  Mail, 
  Share2, 
  Download,
  Info,
  ChevronRight,
  Calendar,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSettings } from '@/lib/context/SettingsContext';

export default function ProductDetailsClient({ product }: { product: BankingProduct }) {
  const { t } = useSettings();

  return (
    <main className="min-h-screen bg-page-bg transition-colors">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="bg-card-bg border-b border-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">{t.productDetails.backToHome}</Link>
            <ChevronRight className={`w-3 h-3 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
            <Link href="/#products" className="hover:text-primary transition-colors">{t.productDetails.backToProducts}</Link>
            <ChevronRight className={`w-3 h-3 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
            <span className="text-text-main">{product.productName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-grow space-y-12">
            {/* Hero Header */}
            <div className="bg-card-bg rounded-3xl p-8 border border-border shadow-sm transition-colors">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 bg-page-bg rounded-2xl p-4 border border-border flex-shrink-0 flex items-center justify-center transition-colors">
                  <Image src={product.bankLogo} alt={product.bankName} width={80} height={80} className="object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">{product.bankName}</span>
                    <span className="text-border">|</span>
                    <span className="text-text-muted text-xs font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {t.productDetails.updated} {product.lastUpdated}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-text-main mb-4 leading-tight">{product.productName}</h1>
                  <p className="text-text-muted leading-relaxed max-w-3xl">{product.description}</p>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <Link href={`/apply/${product.id}`} className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                    {t.productDetails.applyNow} <ArrowRight className={`w-4 h-4 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
                  </Link>
                  <button className="flex items-center justify-center gap-2 text-text-muted font-bold text-sm hover:text-text-main transition-colors py-2">
                    <Share2 className="w-4 h-4" /> {t.productDetails.share}
                  </button>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <section className="bg-card-bg rounded-3xl p-8 border border-border shadow-sm transition-colors">
                <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {t.productDetails.eligibility}
                </h3>
                <ul className="space-y-4">
                  {[
                    t.dir === 'rtl' ? "کم از کم 2 سال کا ثابت شدہ کاروباری ریکارڈ" : "Proven business track record of minimum 2 years",
                    t.dir === 'rtl' ? "درست شناختی کارڈ اور فعال ٹیکس دہندہ کی حیثیت" : "Valid CNIC and active tax-payer status",
                    t.dir === 'rtl' ? "تسلی بخش ای سی آئی بی رپورٹ" : "Satisfactory e-CIB report",
                    t.dir === 'rtl' ? "دیگر مالیاتی اداروں کے ساتھ ادائیگی کی کلین ہسٹری" : "Clean repayment history with other financial institutions"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-card-bg rounded-3xl p-8 border border-border shadow-sm transition-colors">
                <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" /> {t.productDetails.documents}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    t.dir === 'rtl' ? "شناختی کارڈ کی کاپی" : "Copy of CNIC",
                    t.dir === 'rtl' ? "بزنس پروفائل" : "Business Profile",
                    t.dir === 'rtl' ? "انکم ٹیکس ریٹرن" : "Income Tax Returns",
                    t.dir === 'rtl' ? "بینک سٹیٹمنٹس" : "Bank Statements",
                    t.dir === 'rtl' ? "یوٹیلیٹی بلز" : "Utility Bills",
                    t.dir === 'rtl' ? "پارٹنرشپ ڈیڈ" : "Partnership Deed/MOA"
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-page-bg rounded-xl border border-border text-xs font-bold text-text-main transition-colors">
                      <Download className="w-3.5 h-3.5 text-text-muted" />
                      {doc}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Representative Section */}
            <section className="bg-gradient-to-br from-primary to-blue-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl shadow-primary/20">
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className={`text-2xl font-bold mb-4 ${t.dir === 'rtl' ? 'leading-tight' : ''}`}>{t.productDetails.repTitle}</h3>
                  <p className="text-blue-100 mb-8 max-w-md leading-relaxed">{t.productDetails.repDesc}</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-xl shadow-lg">MA</div>
                      <div>
                        <p className="text-sm font-bold">Muhammad Ahmed</p>
                        <p className="text-xs text-blue-200">SME Relationships Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md flex items-center gap-4 border border-white/10 group hover:bg-white/20 transition-all">
                    <div className="p-3 bg-white/20 rounded-xl"><Phone className="w-6 h-6 text-white" /></div>
                    <div>
                      <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">{t.productDetails.phone}</p>
                      <p className="text-xl font-bold" dir="ltr">+92 (300) 123 4567</p>
                    </div>
                  </div>
                  <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md flex items-center gap-4 border border-white/10 group hover:bg-white/20 transition-all">
                    <div className="p-3 bg-white/20 rounded-xl"><Mail className="w-6 h-6 text-white" /></div>
                    <div>
                      <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">{t.productDetails.email}</p>
                      <p className="text-lg font-bold">ahmed.sme@bank.com.pk</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:w-80 flex-shrink-0 space-y-8">
            <div className="bg-card-bg rounded-3xl p-8 border border-border shadow-sm transition-colors">
              <h4 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6">{t.productDetails.financialSpecs}</h4>
              <div className="space-y-6">
                <SpecItem label={t.productDetails.markupType} value={t.dir === 'rtl' ? "متغیر (کائبور سے منسلک)" : "Variable (KIBOR Linked)"} />
                <SpecItem label={t.productDetails.maxAmount} value={`${t.calculator.pkr} ${(product.loanAmount.max / 1000000).toFixed(1)}M`} />
                <SpecItem label={t.productDetails.tenure} value={t.dir === 'rtl' ? "5 سال تک" : "Up to 5 Years"} />
                <SpecItem label={t.productDetails.repayment} value={t.dir === 'rtl' ? "ماہانہ / سہ ماہی" : "Monthly / Quarterly"} />
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col items-center text-center transition-colors">
              <div className="w-16 h-16 bg-card-bg rounded-2xl flex items-center justify-center text-primary shadow-md mb-4 border border-border transition-colors">
                <Info className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-text-main mb-2 tracking-tight">{t.productDetails.needGuidance}</p>
              <p className="text-xs text-text-muted mb-6 leading-relaxed">{t.productDetails.guideDesc}</p>
              <button className="w-full py-3 bg-card-bg text-primary rounded-xl font-bold text-sm border border-border hover:bg-primary/5 transition-all shadow-sm">
                {t.productDetails.downloadGuide}
              </button>
            </div>
          </aside>
        </div>
      </div>

      <ContactUs />
    </main>
  );
}

function SpecItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="group">
      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{label}</p>
      <p className="text-sm font-bold text-text-main">{value}</p>
    </div>
  );
}
