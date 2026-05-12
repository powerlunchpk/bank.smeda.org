'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useSettings } from '@/lib/context/SettingsContext';

export default function NotFound() {
  useSettings();
  
  return (
    <main className="min-h-screen bg-page-bg transition-colors">
      <Header />
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-display font-bold text-text-muted/20 mb-6 transition-colors">404</h1>
        <h2 className="text-2xl font-bold text-text-main mb-4 transition-colors">Page Not Found</h2>
        <p className="text-text-muted mb-12 transition-colors">
          The banking product or page you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/10 hover:opacity-90 transition-all font-display"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
