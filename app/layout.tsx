import type { Metadata } from 'next';
import { Inter, Outfit, Noto_Nastaliq_Urdu } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

const urdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  variable: '--font-urdu',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'SMEDA Financial Products Portal',
  description: 'A comprehensive platform for SMEs in Pakistan to discover, compare, and apply for banking products.',
};

import { SettingsProvider } from '@/lib/context/SettingsContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${urdu.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
