'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    image: 'https://picsum.photos/seed/sme1/1920/1080',
    title: 'Empowering SMEs for a Prosperous Pakistan',
    description: 'Find the right financial products tailored for your business growth and sustainability.'
  },
  {
    image: 'https://picsum.photos/seed/sme2/1920/1080',
    title: 'Your Partner in Financial Literacy',
    description: 'Access tutorials, compare loan schemes, and make informed decisions for your enterprise.'
  },
  {
    image: 'https://picsum.photos/seed/sme3/1920/1080',
    title: 'Unlock Your Business Potential',
    description: 'From working capital to long-term expansion loans, we help you navigate the banking landscape.'
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-slate-900">
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
          <div className="absolute inset-0 bg-gradient-to-r from-smeda-blue/80 to-transparent" />
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
          <h1 className="text-4xl md:text-6xl text-white mb-6 leading-tight">
            {SLIDES[current].title}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
            {SLIDES[current].description}
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-smeda-blue px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-2 group">
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all">
              Learn More
            </button>
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
