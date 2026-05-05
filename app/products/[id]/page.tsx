import React from 'react';
import { MOCK_PRODUCTS } from '@/lib/data';
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
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-smeda-blue transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/#products" className="hover:text-smeda-blue transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-600">{product.productName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-grow space-y-12">
            {/* Hero Header */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 bg-slate-50 rounded-2xl p-4 border border-slate-100 flex-shrink-0 flex items-center justify-center">
                  <Image src={product.bankLogo} alt={product.bankName} width={80} height={80} className="object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-50 text-smeda-blue rounded-full text-[10px] font-bold uppercase tracking-wider">{product.bankName}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-500 text-xs font-medium flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" /> Updated {product.lastUpdated}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">{product.productName}</h1>
                  <p className="text-slate-600 leading-relaxed max-w-3xl">{product.description}</p>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <Link href={`/apply/${product.id}`} className="bg-smeda-blue text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/10">
                    Apply Now <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                  <button className="flex items-center justify-center gap-2 text-slate-500 font-bold text-sm hover:text-slate-900 transition-colors py-2">
                    <Share2 className="w-4 h-4" /> Share Product
                  </button>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" /> Eligibility Criteria
                </h3>
                <ul className="space-y-4">
                  {[
                    "Proven business track record of minimum 2 years",
                    "Valid CNIC and active tax-payer status",
                    "Satisfactory e-CIB report",
                    "Clean repayment history with other financial institutions"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-200 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" /> Documents Required
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Copy of CNIC",
                    "Business Profile",
                    "Income Tax Returns",
                    "Bank Statements",
                    "Utility Bills",
                    "Partnership Deed/MOA"
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      {doc}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Representative Section */}
            <section className="bg-gradient-to-br from-smeda-blue to-blue-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Dedicated Bank Representative</h3>
                  <p className="text-blue-100 mb-8 max-w-md">Contact the authorized representative for this product to get personalized guidance and fast-track your application.</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-smeda-blue font-bold text-xl">MA</div>
                      <div>
                        <p className="text-sm font-bold">Muhammad Ahmed</p>
                        <p className="text-xs text-blue-200">SME Relationships Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md flex items-center gap-4 border border-white/10">
                    <div className="p-3 bg-blue-400/20 rounded-xl"><Phone className="w-6 h-6 text-blue-200" /></div>
                    <div>
                      <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">Phone</p>
                      <p className="text-xl font-bold">+92 (300) 123 4567</p>
                    </div>
                  </div>
                  <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md flex items-center gap-4 border border-white/10">
                    <div className="p-3 bg-blue-400/20 rounded-xl"><Mail className="w-6 h-6 text-blue-200" /></div>
                    <div>
                      <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">Email</p>
                      <p className="text-lg font-bold">ahmed.sme@bank.com.pk</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:w-80 flex-shrink-0 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Financial Specs</h4>
              <div className="space-y-6">
                <SpecItem label="Markup Type" value="Variable (KIBOR Linked)" />
                <SpecItem label="Max Amount" value={`PKR ${(product.loanAmount.max / 1000000).toFixed(1)}M`} />
                <SpecItem label="Tenure" value="Up to 5 Years" />
                <SpecItem label="Repayment" value="Monthly / Quarterly" />
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-smeda-blue shadow-md mb-4">
                <Info className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-smeda-blue mb-2">Need Guidance?</p>
              <p className="text-xs text-slate-500 mb-6">Download our &quot;Beginners Guide to SME Financing&quot; to help prepare your documentation.</p>
              <button className="w-full py-3 bg-white text-smeda-blue rounded-xl font-bold text-sm border border-blue-100 hover:bg-blue-100 transition-colors shadow-sm">
                Download Guide
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
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
}
