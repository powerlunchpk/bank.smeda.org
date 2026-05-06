
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useSettings } from '@/lib/context/SettingsContext';

const SLIDES = [
  {
    image: 'https://picsum.photos/seed/banking1/1920/1080',
    titleKey: 'title',
    descKey: 'subtitle'
  },
  {
    image: 'https://picsum.photos/seed/business-office/1920/1080',
    titleKey: 'title',
    descKey: 'subtitle'
  },
  {
    image: 'https://picsum.photos/seed/finance-growth/1920/1080',
    titleKey: 'title',
    descKey: 'subtitle'
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const { t } = useSettings();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-slate-900 border-b border-border transition-colors">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].image}
            alt="Hero Background"
            fill
            className="object-cover opacity-60"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent transition-colors" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          key={current + '-content'}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl text-white mb-6 leading-tight font-display font-bold">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#products" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center gap-2 group shadow-xl">
              {t.hero.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/how-it-works" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all">
              {t.nav.howItWorks}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-2">
        <button onClick={prev} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={next} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-10 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </section>
  );
}
