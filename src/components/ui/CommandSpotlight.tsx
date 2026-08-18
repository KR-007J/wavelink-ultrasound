import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { soundEngine } from '../../lib/soundEngine';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import {
  TransducerIcon,
  WaveformIcon,
  PacketIcon,
  SlidersIcon,
  ArrowRightIcon,
  FftIcon,
} from '../telemetry/CustomAcousticIcons';

interface CommandSpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onOpenDevKitModal: () => void;
}

export const CommandSpotlight: React.FC<CommandSpotlightProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenDevKitModal,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isExplodedView = useWavelinkStore((s) => s.isExplodedView);
  const toggleExplodedView = useWavelinkStore((s) => s.toggleExplodedView);
  const isFreeOrbit = useWavelinkStore((s) => s.isFreeOrbit);
  const toggleFreeOrbit = useWavelinkStore((s) => s.toggleFreeOrbit);
  const startSimulation = useWavelinkStore((s) => s.startSimulation);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const setCarrierFreq = useWavelinkStore((s) => s.setCarrierFreq);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const actions = [
    {
      category: 'NAVIGATION',
      id: 'nav-home',
      label: 'Navigate to Overview & Scrollytelling',
      icon: TransducerIcon,
      shortcut: 'G H',
      run: () => onNavigate('home'),
    },
    {
      category: 'NAVIGATION',
      id: 'nav-origin',
      label: 'Navigate to Origin & Hardware Evolution',
      icon: TransducerIcon,
      shortcut: 'G O',
      run: () => onNavigate('origin'),
    },
    {
      category: 'NAVIGATION',
      id: 'nav-mechanics',
      label: 'Navigate to Mechanics & DSP Lab',
      icon: FftIcon,
      shortcut: 'G M',
      run: () => onNavigate('mechanics'),
    },
    {
      category: 'NAVIGATION',
      id: 'nav-showcase',
      label: 'Navigate to Enterprise Deployments & Motion',
      icon: PacketIcon,
      shortcut: 'G S',
      run: () => onNavigate('showcase'),
    },
    {
      category: 'NAVIGATION',
      id: 'nav-deploy',
      label: 'Navigate to Developer SDK & CLI Terminal',
      icon: SlidersIcon,
      shortcut: 'G D',
      run: () => onNavigate('deploy'),
    },
    {
      category: 'HARDWARE ACTIONS',
      id: 'act-explode',
      label: isExplodedView ? 'Collapse 3D CAD Assembly' : 'Explode 3D CAD Assembly Layers',
      icon: TransducerIcon,
      shortcut: 'E',
      run: () => {
        soundEngine.playThud(!isExplodedView);
        toggleExplodedView();
      },
    },
    {
      category: 'HARDWARE ACTIONS',
      id: 'act-orbit',
      label: isFreeOrbit ? 'Exit 360° Free Orbit Mode' : 'Enter 360° Free Orbit Inspection',
      icon: TransducerIcon,
      shortcut: 'O',
      run: () => {
        soundEngine.playClick();
        toggleFreeOrbit();
      },
    },
    {
      category: 'LIVE SIMULATION',
      id: 'act-packet',
      label: 'Transmit Acoustic Test Packet (2-FSK Burst)',
      icon: PacketIcon,
      shortcut: 'T',
      run: () => {
        soundEngine.playPacketBurst();
        startSimulation('SPOTLIGHT_AIRGAP_0x9F');
      },
    },
    {
      category: 'ADVANCED LAB',
      id: 'act-radar',
      label: 'Open Browser Microphone Ultrasonic Radar',
      icon: FftIcon,
      shortcut: 'R',
      run: () => onNavigate('mechanics'),
    },
    {
      category: 'ADVANCED LAB',
      id: 'act-beam',
      label: 'Open 3D Phased-Array Beam-Steering Simulator',
      icon: TransducerIcon,
      shortcut: 'B',
      run: () => onNavigate('mechanics'),
    },
    {
      category: 'ADVANCED LAB',
      id: 'act-levitate',
      label: 'Open 3D Acoustic Levitation Chamber',
      icon: WaveformIcon,
      shortcut: 'L',
      run: () => onNavigate('mechanics'),
    },
    {
      category: 'LIVE SIMULATION',
      id: 'act-tune-up',
      label: `Tune Carrier Frequency (+0.5 kHz) → ${(Math.min(24, carrierFreq + 0.5)).toFixed(1)} kHz`,
      icon: WaveformIcon,
      shortcut: '+',
      run: () => {
        const next = Math.min(24, carrierFreq + 0.5);
        setCarrierFreq(next);
        soundEngine.playPiezoChirp(next);
      },
    },
    {
      category: 'DEVELOPER TOOLS',
      id: 'dev-modal',
      label: 'Request WAVELINK Dev Kit v2 (2x Modules + SDK)',
      icon: ArrowRightIcon,
      shortcut: 'K',
      run: () => onOpenDevKitModal(),
    },
  ];

  const filtered = actions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action: typeof actions[0]) => {
    soundEngine.playClick();
    action.run();
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: -20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: -20, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl w-full telemetry-glass overflow-hidden shadow-2xl flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Top Glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent" />

          {/* Search Input Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-black/40">
            <span className="text-[#FF6B35] font-mono text-sm font-bold">⌘K</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or jump to page..."
              className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-slate-500"
            />
            <span className="text-[10px] font-mono text-slate-500 px-2 py-1 rounded bg-white/5 border border-white/10">
              ESC TO CLOSE
            </span>
          </div>

          {/* Filtered Action List */}
          <div className="max-h-96 overflow-y-auto p-2 flex flex-col gap-1 font-mono text-xs">
            {filtered.length > 0 ? (
              filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-left text-slate-300 hover:text-white hover:bg-[#FF6B35]/15 hover:border-[#FF6B35]/30 border border-transparent transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#FF6B35]/20 transition-colors">
                        <Icon size={14} color={THEME.accent} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 group-hover:text-[#FF6B35] transition-colors">{item.category}</span>
                        <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-500 px-2 py-1 rounded bg-white/5 border border-white/10 group-hover:border-[#FF6B35]/30">
                      {item.shortcut}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-500 font-mono text-xs">
                No matching hardware commands found.
              </div>
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="flex justify-between items-center px-5 py-3 border-t border-white/10 bg-black/40 text-[10px] font-mono text-slate-500">
            <span>↑↓ TO NAVIGATE · ↵ TO SELECT</span>
            <span className="text-[#FF6B35] font-bold">WAVELINK COMMAND SPOTLIGHT</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommandSpotlight;
