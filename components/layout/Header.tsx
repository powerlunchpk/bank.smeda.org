'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Search, PhoneCall } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSearch = () => {
    if (pathname !== '/') {
      router.push('/#products');
      return;
    }
    const searchInput = document.getElementById('main-search-input');
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      searchInput.focus();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-smeda-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-display font-bold text-smeda-blue leading-tight uppercase tracking-wider">SMEDA</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em] -mt-1">Financial Services</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-smeda-blue transition-colors">How it Works</Link>
            <Link href="/directives" className="text-sm font-medium text-slate-600 hover:text-smeda-blue transition-colors">Directives</Link>
            <Link href="/schemes/sbp" className="text-sm font-medium text-slate-600 hover:text-smeda-blue transition-colors">SBP Schemes</Link>
            <Link href="/schemes/pmyb-als" className="text-sm font-medium text-slate-600 hover:text-smeda-blue transition-colors">PMYB&ALS</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToSearch}
              title="Search banking products"
              className="p-2 text-slate-500 hover:text-smeda-blue rounded-full hover:bg-slate-50 transition-all"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link 
              href="tel:+9242111111456" 
              title="Call our support helpline"
              className="hidden sm:flex items-center gap-2 bg-smeda-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Us</span>
            </Link>
            <button 
              title="Main Menu"
              className="md:hidden p-2 text-slate-600"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
