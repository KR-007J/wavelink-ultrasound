import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { TransducerIcon } from '../telemetry/CustomAcousticIcons';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const phrases = [
    'Establishing Carrier Signal…',
    'Calibrating Transducer Array…',
    'Synchronizing Waveform…',
    'Ready.',
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1200);
    const t3 = setTimeout(() => setStep(3), 1800);
    const t4 = setTimeout(() => onComplete(), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onComplete}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer select-none px-6"
      style={{ backgroundColor: '#0E0E12' }}
    >
      <div className="flex flex-col items-center gap-8 max-w-sm w-full text-center">
        
        {/* Centered Transducer Brand Mark */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center border"
          style={{
            backgroundColor: 'rgba(255, 107, 53, 0.08)',
            borderColor: 'rgba(255, 107, 53, 0.25)',
            boxShadow: '0 0 35px -5px rgba(255, 107, 53, 0.35)',
          }}
        >
          <TransducerIcon size={34} color={THEME.accent} />
        </motion.div>

        {/* Brand Title */}
        <div className="flex flex-col gap-1">
          <span className="font-display font-black text-2xl tracking-widest text-white">
            WAVELINK
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
            Near-Ultrasonic Data Transfer Platform
          </span>
        </div>

        {/* Typewriter Pipeline Phrase Cycle */}
        <div className="h-8 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.span
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="font-mono text-xs text-slate-300 font-medium tracking-wide flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              <span>{phrases[step]}</span>
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Click to skip micro-hint */}
        <span className="text-[10px] font-mono text-slate-600 tracking-wider">
          CLICK OR SCROLL TO SKIP
        </span>

      </div>
    </motion.div>
  );
};

export default LoadingSequence;
