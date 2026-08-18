import React from 'react';
import { THEME } from '../../lib/theme';
import { TransducerIcon } from '../telemetry/CustomAcousticIcons';
import { useWavelinkStore } from '../../store/useWavelinkStore';

export const FooterSection: React.FC = () => {
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);

  return (
    <footer className="relative z-10 w-full pointer-events-auto border-t border-white/10 bg-[#0B0C0E] py-20 px-6 md:px-12 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Oversized Faded Wordmark */}
        <div className="overflow-hidden">
          <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-white/[0.04] select-none tracking-tighter block text-center">
            WAVELINK
          </span>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-white font-bold tracking-wider">HARDWARE PIPELINE</span>
            <a href="#emit" className="hover:text-white transition-colors">01. Emit Transducer</a>
            <a href="#modulate" className="hover:text-white transition-colors">02. FSK Modulator</a>
            <a href="#propagate" className="hover:text-white transition-colors">03. Wavefront Travel</a>
            <a href="#demodulate" className="hover:text-white transition-colors">04. FFT Receiver</a>
            <a href="#decode" className="hover:text-white transition-colors">05. Frame Decoder</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white font-bold tracking-wider">DEVELOPER</span>
            <a href="#specs" className="hover:text-white transition-colors">C/Rust Firmware SDK</a>
            <a href="#specs" className="hover:text-white transition-colors">WebAssembly Bridge</a>
            <a href="#specs" className="hover:text-white transition-colors">Acoustic Driver Reference</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white font-bold tracking-wider">APPLICATIONS</span>
            <a href="#propagate" className="hover:text-white transition-colors">Air-Gapped Data Diode</a>
            <a href="#propagate" className="hover:text-white transition-colors">Contactless Pairings</a>
            <a href="#propagate" className="hover:text-white transition-colors">Industrial Telemetry</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white font-bold tracking-wider">COMPLIANCE & LEGAL</span>
            <span className="text-slate-500">Zero RF Emissions (FCC Excluded)</span>
            <span className="text-slate-500">Ultrasonic Safety Standards</span>
            <span className="text-slate-500">© 2026 WAVELINK TECHNOLOGIES</span>
          </div>
        </div>

        {/* Telemetry Status Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-8 gap-4">
          <div className="flex items-center gap-3 text-white">
            <TransducerIcon size={20} color={THEME.accent} />
            <span className="font-bold tracking-wider">WAVELINK CORE</span>
            <span className="text-slate-500">· ACOUSTIC HARDWARE INTERFACE</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[#00E5FF] font-bold">SIGNAL: STABLE · {carrierFreq} kHz CARRIER</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
