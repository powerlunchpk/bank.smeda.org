'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, HelpCircle, Target } from 'lucide-react';
import { useSettings } from '@/lib/context/SettingsContext';

export default function OnboardingTour() {
  const { t } = useSettings();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const TOUR_STEPS = [
    {
      target: 'search-tour-target',
      title: t.tutorial.step1Title,
      content: t.tutorial.step1Content,
      position: 'bottom'
    },
    {
      target: 'compare-tour-target',
      title: t.tutorial.step2Title,
      content: t.tutorial.step2Content,
      position: 'top'
    },
    {
      target: 'calculator-tour-target',
      title: t.tutorial.step3Title,
      content: t.tutorial.step3Content,
      position: 'top'
    }
  ];

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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm p-6 bg-card-bg rounded-[2rem] shadow-2xl pointer-events-auto border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <button onClick={completeTour} className="p-1 text-text-muted hover:text-text-main">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2 leading-none">
            {t.tutorial.title.replace('{step}', (currentStep + 1).toString()).replace('{total}', TOUR_STEPS.length.toString())}
          </p>
          <h3 className="text-xl font-bold text-text-main mb-3">{TOUR_STEPS[currentStep].title}</h3>
          <p className="text-sm text-text-muted leading-relaxed mb-8">
            {TOUR_STEPS[currentStep].content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {TOUR_STEPS.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-6 bg-primary' : 'w-1.5 bg-border'}`} />
              ))}
            </div>
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-primary text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              {currentStep === TOUR_STEPS.length - 1 ? t.tutorial.start : t.tutorial.next}
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Floating indicator to emphasize context */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-6 h-6 bg-primary rounded-full border-4 border-card-bg shadow-lg flex items-center justify-center">
              <Target className="w-3 h-3 text-white" />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
