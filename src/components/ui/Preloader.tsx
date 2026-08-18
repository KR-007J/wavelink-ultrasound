import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { TransducerIcon } from '../telemetry/CustomAcousticIcons';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Synthesizing Carrier Shaders…');

  const statusMap = [
    { at: 25, text: 'Calibrating Piezoelectric Diaphragm…' },
    { at: 60, text: 'Locking 20.4 kHz Resonance Band…' },
    { at: 85, text: 'Synchronizing Acoustic Receiver Node…' },
    { at: 100, text: 'Acoustic Telemetry Stream Active' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 350);
          return 100;
        }
        const next = prev + 2;
        const match = statusMap.find((s) => s.at >= next);
        if (match) setStatus(match.text);
        return next;
      });
    }, 24);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: THEME.bg }}
    >
      <div className="max-w-xs w-full flex flex-col items-center gap-6 text-center">
        
        {/* Custom Transducer Brand Mark */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center border"
          style={{
            backgroundColor: 'rgba(0, 229, 255, 0.08)',
            borderColor: 'rgba(0, 229, 255, 0.25)',
            boxShadow: '0 0 35px -5px rgba(0, 229, 255, 0.35)',
          }}
        >
          <TransducerIcon size={34} color={THEME.accent} />
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-display font-black text-2xl tracking-widest text-white">
            WAVELINK
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
            Near-Ultrasonic Data Transfer Platform
          </span>
        </div>

        {/* Progress Microcopy */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center font-mono text-[11px] text-slate-400">
            <span>{status}</span>
            <span style={{ color: THEME.accent }} className="font-bold">{progress}%</span>
          </div>

          <div className="w-full bg-white/5 border border-white/10 rounded-full h-1.5 p-0.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: THEME.accent,
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.8)',
              }}
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Preloader;
