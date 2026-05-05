import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-display font-bold text-slate-200 mb-6">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-12">
          The banking product or page you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-smeda-blue text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/10 hover:bg-blue-800 transition-all"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
