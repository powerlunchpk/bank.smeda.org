'use client';

import React, { useState } from 'react';
import { BankingProduct } from '@/lib/types';
import { 
  Building2, 
  User, 
  DollarSign, 
  Upload,
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Info
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

import { useSettings } from '@/lib/context/SettingsContext';

export default function ApplyForm({ product }: { product: BankingProduct }) {
  const { t } = useSettings();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const STEPS = [
    { id: 1, title: t.applyForm.businessDetails, icon: <Building2 className="w-4 h-4" /> },
    { id: 2, title: t.applyForm.ownerInfo, icon: <User className="w-4 h-4" /> },
    { id: 3, title: t.applyForm.loanRequirements, icon: <DollarSign className="w-4 h-4" /> },
    { id: 4, title: t.applyForm.documentation, icon: <Upload className="w-4 h-4" /> }
  ];

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-200">
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        <h1 className="text-4xl font-display font-bold text-text-main mb-4 transition-colors">{t.applyForm.submitted}</h1>
        <p className="text-text-muted mb-12 max-w-md mx-auto transition-colors">
          {t.applyForm.submittedDesc.replace('{product}', product.productName).replace('{bank}', product.bankName)}
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-sm mx-auto">
          <Link href="/" className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 text-center hover:opacity-90 transition-all">{t.applyForm.returnHome}</Link>
          <button className="bg-card-bg text-text-muted px-6 py-3 rounded-xl font-bold border border-border transition-colors hover:bg-page-bg">{t.applyForm.track}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Form Area */}
      <div className="flex-grow">
        <div className="bg-card-bg rounded-3xl p-8 md:p-10 border border-border shadow-sm relative overflow-hidden transition-colors">
           {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-page-bg">
            <motion.div 
              className="h-full bg-primary" 
              initial={{ width: '0%' }}
              animate={{ width: `${(step / STEPS.length) * 100}%` }}
            />
          </div>

          <div className="mb-10 text-center">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] mb-2">{t.applyForm.step.replace('{step}', step.toString()).replace('{total}', STEPS.length.toString())}</p>
            <h2 className="text-2xl font-bold text-text-main transition-colors">{STEPS[step-1].title}</h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: t.dir === 'rtl' ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: t.dir === 'rtl' ? 10 : -10 }}
              className="space-y-6"
            >
              {step === 1 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input label={t.applyForm.placeholders.businessName} placeholder="ABC Manufacturing" />
                  <Input label={t.applyForm.placeholders.ntn} placeholder="1234567-8" />
                  <Select label="Entity Type" options={t.dir === 'rtl' ? ['سول پروپرائٹر شپ', 'پارٹنرشپ', 'پرائیویٹ لمیٹڈ'] : ['Sole Proprietorship', 'Partnership', 'Private Limited']} />
                  <Input label={t.applyForm.placeholders.incorporation} placeholder="DD-MM-YYYY" />
                  <div className="sm:col-span-2">
                    <Input label={t.applyForm.placeholders.address} placeholder="Street, City, Province" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input label={t.applyForm.placeholders.ownerName} placeholder="John Doe" />
                  <Input label={t.applyForm.placeholders.cnic} placeholder="12345-1234567-1" />
                  <Input label={t.applyForm.placeholders.contact} placeholder="+92 300 0000000" />
                  <Input label={t.applyForm.placeholders.email} placeholder="owner@business.com" />
                </div>
              )}

              {step === 3 && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input label={t.applyForm.placeholders.amount} placeholder="e.g. 5,000,000" type="number" defaultValue={product.loanAmount.max.toString()} />
                  <Select label="Repayment Tenure" options={t.dir === 'rtl' ? ['1 سال', '2 سال', '3 سال', '5 سال'] : ['1 Year', '2 Years', '3 Years', '5 Years']} />
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2 transition-colors">{t.applyForm.placeholders.purpose}</label>
                    <textarea 
                      className="w-full bg-page-bg border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none h-24 text-text-main transition-all placeholder:text-text-muted/40" 
                      placeholder={t.applyForm.placeholders.purposeDesc}
                      defaultValue={t.dir === 'rtl' ? `کاروبار کی ترقی اور آپریشنز کے لیے ${product.productName} کے لیے اپلائی کر رہا ہوں۔` : `Applying for ${product.productName} to support business growth and operations.`}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-sm text-text-muted mb-4 transition-colors">
                    {t.dir === 'rtl' ? "براہ کرم درج ذیل دستاویزات کے اعلیٰ معیار کے اسکین اپ لوڈ کریں:" : "Please upload high-quality scans of the following documents:"}
                  </p>
                  {[
                    t.dir === 'rtl' ? 'شناختی کارڈ کی اسکین شدہ کاپی (سامنے اور پیچھے)' : 'Scanned copy of CNIC (Front & Back)',
                    t.dir === 'rtl' ? 'گزشتہ 6 ماہ کی بینک سٹیٹمنٹ' : 'Latest 6 Months Bank Statement',
                    t.dir === 'rtl' ? 'کاروبار کی رجسٹریشن کے دستاویزات' : 'Business Registration Documents',
                    t.dir === 'rtl' ? 'ایکٹو ٹیکس دہندہ سرٹیفکیٹ (NTN)' : 'Active Taxpayer Certificate (NTN)'
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-page-bg border-2 border-dashed border-border rounded-2xl group hover:border-primary transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                        <span className="text-sm font-semibold text-text-main transition-colors">{doc}</span>
                      </div>
                      <span className="text-[10px] font-bold text-text-muted uppercase">{t.applyForm.uploadLimit}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between pt-8 border-t border-border">
            <button 
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className={`flex items-center gap-2 font-bold text-sm transition-colors ${step === 1 ? 'text-border' : 'text-text-muted hover:text-text-main'}`}
            >
              <ArrowLeft className={`w-4 h-4 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} /> {t.applyForm.prev}
            </button>
            <button 
              onClick={() => {
                if (step === STEPS.length) {
                  setSubmitted(true);
                } else {
                  setStep(s => s + 1);
                }
              }}
              className="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              {step === STEPS.length ? t.applyForm.submit : t.applyForm.next} <ArrowRight className={`w-4 h-4 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Side Info */}
      <aside className="lg:w-80 flex-shrink-0 space-y-6">
        <div className="bg-card-bg rounded-3xl p-8 border border-border shadow-sm transition-colors">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-xl bg-page-bg border border-border p-2 flex items-center justify-center transition-colors">
                 <Image src={product.bankLogo} alt={product.bankName} width={40} height={40} className="object-contain" referrerPolicy="no-referrer" />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">{t.dir === 'rtl' ? "اپلائی کیا جا رہا ہے" : "Applying for"}</p>
                 <p className="text-xs font-bold text-primary line-clamp-1">{product.productName}</p>
               </div>
            </div>
            <div className="space-y-2">
                {STEPS.map((s) => (
                  <div key={s.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${step > s.id ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : step === s.id ? 'bg-primary text-white' : 'bg-page-bg text-text-muted'}`}>
                      {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.icon}
                    </div>
                    <span className={`text-xs font-bold ${step === s.id ? 'text-text-main' : 'text-text-muted'}`}>{s.title}</span>
                  </div>
                ))}
            </div>
        </div>

        <div className="p-6 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex gap-4 transition-colors">
            <div className="p-2 bg-card-bg rounded-lg self-start text-amber-500 border border-amber-500/20">
                <Info className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs font-bold text-amber-600 mb-1">{t.applyForm.important}</p>
                <p className="text-[10px] leading-relaxed text-amber-900/60 dark:text-amber-200/60 font-medium">{t.applyForm.importantDesc}</p>
            </div>
        </div>
      </aside>
    </div>
  );
}

function Input({ label, placeholder, type = 'text', defaultValue }: { label: string, placeholder: string, type?: string, defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-text-muted uppercase tracking-wider block transition-colors">{label}</label>
      <input 
        type={type} 
        className="w-full bg-page-bg border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-text-muted/40 text-text-main"
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
}

function Select({ label, options }: { label: string, options: string[] }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-text-muted uppercase tracking-wider block transition-colors">{label}</label>
      <select className="w-full bg-page-bg border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer text-text-main">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

