import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'SMEDA Financial Products Portal',
  description: 'A comprehensive platform for SMEs in Pakistan to discover, compare, and apply for banking products.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
