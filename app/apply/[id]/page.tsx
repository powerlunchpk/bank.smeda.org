'use client';

import React, { useState, use } from 'react';
import { MOCK_PRODUCTS } from '@/lib/data';
import Header from '@/components/layout/Header';
import { 
  Building2, 
  User, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Upload,
  Info
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

const STEPS = [
  { id: 1, title: 'Business details', icon: <Building2 className="w-4 h-4" /> },
  { id: 2, title: 'Owner info', icon: <User className="w-4 h-4" /> },
  { id: 3, title: 'Loan requirements', icon: <DollarSign className="w-4 h-4" /> },
  { id: 4, title: 'Documentation', icon: <Upload className="w-4 h-4" /> }
];

export default function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (!product) {
    notFound();
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-200">
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Application Submitted!</h1>
          <p className="text-slate-500 mb-12 max-w-md mx-auto">
            Your application for <strong>{product.productName}</strong> has been received by <strong>{product.bankName}</strong>. You will receive a tracking ID via SMS shortly.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-sm mx-auto">
            <Link href="/" className="bg-smeda-blue text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/10">Return Home</Link>
            <button className="bg-slate-50 text-slate-600 px-6 py-3 rounded-xl font-bold border border-slate-200">Track Application</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Area */}
          <div className="flex-grow">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
               {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
                <motion.div 
                  className="h-full bg-smeda-blue" 
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / STEPS.length) * 100}%` }}
                />
              </div>

              <div className="mb-10 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Step {step} of {STEPS.length}</p>
                <h2 className="text-2xl font-bold text-slate-900">{STEPS[step-1].title}</h2>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {step === 1 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input label="Business Name" placeholder="ABC Manufacturing" />
                      <Input label="NTN Number" placeholder="1234567-8" />
                      <Select label="Entity Type" options={['Sole Proprietorship', 'Partnership', 'Private Limited']} />
                      <Input label="Date of Incorporation" placeholder="DD-MM-YYYY" />
                      <div className="sm:col-span-2">
                        <Input label="Business Address" placeholder="Street, City, Province" />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input label="Primary Owner Name" placeholder="John Doe" />
                      <Input label="CNIC Number" placeholder="12345-1234567-1" />
                      <Input label="Contact Number" placeholder="+92 300 0000000" />
                      <Input label="Email Address" placeholder="owner@business.com" />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input label="Required Loan Amount" placeholder="e.g. 5,000,000" type="number" />
                      <Select label="Repayment Tenure" options={['1 Year', '2 Years', '3 Years', '5 Years']} />
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Purpose of financing</label>
                        <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-smeda-blue/20 focus:border-smeda-blue outline-none h-24" placeholder="Briefly describe why you need this financing..." />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-500 mb-4">Please upload high-quality scans of the following documents:</p>
                      {[
                        'Scanned copy of CNIC (Front & Back)',
                        'Latest 6 Months Bank Statement',
                        'Business Registration Documents',
                        'Active Taxpayer Certificate (NTN)'
                      ].map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl group hover:border-smeda-blue transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Upload className="w-5 h-5 text-slate-400 group-hover:text-smeda-blue" />
                            <span className="text-sm font-semibold text-slate-700">{doc}</span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">MAX 5MB</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
                <button 
                  onClick={() => setStep(s => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className={`flex items-center gap-2 font-bold text-sm transition-colors ${step === 1 ? 'text-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  <ArrowLeft className="w-4 h-4" /> Previous Step
                </button>
                <button 
                  onClick={() => {
                    if (step === STEPS.length) {
                      setSubmitted(true);
                    } else {
                      setStep(s => s + 1);
                    }
                  }}
                  className="bg-smeda-blue text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/10"
                >
                  {step === STEPS.length ? 'Final Submit' : 'Continue'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Side Info */}
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                     <Image src={product.bankLogo} alt={product.bankName} width={40} height={40} className="object-contain" referrerPolicy="no-referrer" />
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Applying for</p>
                     <p className="text-xs font-bold text-smeda-blue line-clamp-1">{product.productName}</p>
                   </div>
                </div>
                <div className="space-y-2">
                    {STEPS.map((s) => (
                      <div key={s.id} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${step > s.id ? 'bg-green-100 text-green-600' : step === s.id ? 'bg-smeda-blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.icon}
                        </div>
                        <span className={`text-xs font-bold ${step === s.id ? 'text-slate-900' : 'text-slate-400'}`}>{s.title}</span>
                      </div>
                    ))}
                </div>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                <div className="p-2 bg-white rounded-lg self-start text-amber-600">
                    <Info className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs font-bold text-amber-800 mb-1">Important</p>
                    <p className="text-[10px] leading-relaxed text-amber-900/60 font-medium">Please ensure all figures and document scans are accurate. Mismatching info can lead to processing delays or rejection.</p>
                </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Input({ label, placeholder, type = 'text' }: { label: string, placeholder: string, type?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{label}</label>
      <input 
        type={type} 
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-smeda-blue/20 focus:border-smeda-blue outline-none transition-all placeholder:text-slate-300"
        placeholder={placeholder}
      />
    </div>
  );
}

function Select({ label, options }: { label: string, options: string[] }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{label}</label>
      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-smeda-blue/20 focus:border-smeda-blue outline-none transition-all cursor-pointer">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
