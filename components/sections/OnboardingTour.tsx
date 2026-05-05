'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, HelpCircle, Target } from 'lucide-react';

const TOUR_STEPS = [
  {
    target: 'search-tour-target',
    title: 'Find Your Match',
    content: 'Start by searching for keywords like "working capital" or a specific "bank name" to find tailored loans.',
    position: 'bottom'
  },
  {
    target: 'compare-tour-target',
    title: 'Smart Comparison',
    content: 'Select up to 3 products using the compare checkbox to analyze them side-by-side in the bottom drawer.',
    position: 'top'
  },
  {
    target: 'calculator-tour-target',
    title: 'Plan Your Finance',
    content: 'Use the loan calculator to estimate your monthly installments and total interest before applying.',
    position: 'top'
  }
];

export default function OnboardingTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('smeda_tour_completed');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTour = () => {
    setIsVisible(false);
    localStorage.setItem('smeda_tour_completed', 'true');
  };

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTour();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] pointer-events-auto" onClick={completeTour} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm p-6 bg-white rounded-[2rem] shadow-2xl pointer-events-auto border border-blue-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-smeda-blue rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <button onClick={completeTour} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 leading-none">
            Tutorial Step {currentStep + 1} / {TOUR_STEPS.length}
          </p>
          <h3 className="text-xl font-bold text-slate-900 mb-3">{TOUR_STEPS[currentStep].title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            {TOUR_STEPS[currentStep].content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {TOUR_STEPS.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-6 bg-smeda-blue' : 'w-1.5 bg-slate-200'}`} />
              ))}
            </div>
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-smeda-blue text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/20"
            >
              {currentStep === TOUR_STEPS.length - 1 ? 'Get Started' : 'Next Step'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Floating indicator to emphasize context */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-6 h-6 bg-smeda-blue rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <Target className="w-3 h-3 text-white" />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
