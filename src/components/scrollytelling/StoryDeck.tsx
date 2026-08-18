import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { soundEngine } from '../../lib/soundEngine';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import {
  TransducerIcon,
  WaveformIcon,
  PacketIcon,
  FftIcon,
  SlidersIcon,
  ArrowRightIcon,
  AcousticShieldIcon,
} from '../telemetry/CustomAcousticIcons';
import { TactileButton } from '../ui/TactileButton';
import { SpectrumBars } from '../telemetry/SpectrumBars';
import { OscilloscopeStrip } from '../telemetry/OscilloscopeStrip';
import { ConstellationPlot } from '../telemetry/ConstellationPlot';
import { PacketSimulator } from '../simulation/PacketSimulator';
import { LinkBudgetCalculator } from '../simulation/LinkBudgetCalculator';
import { ImpairmentSandbox } from '../simulation/ImpairmentSandbox';

interface StoryDeckProps {
  onOpenDevKitModal?: () => void;
}

export const StoryDeck: React.FC<StoryDeckProps> = ({ onOpenDevKitModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const setCarrierFreq = useWavelinkStore((s) => s.setCarrierFreq);
  const isExplodedView = useWavelinkStore((s) => s.isExplodedView);
  const toggleExplodedView = useWavelinkStore((s) => s.toggleExplodedView);

  const slides = [
    {
      id: 'slide-01',
      chapter: 'CHAPTER 01 // THE GENESIS',
      title: 'The Silent Sanctuary in a Noisy World',
      authorQuote: 'Every wireless packet bleeds an electromagnetic signature. We set out to build a channel that physics itself keeps contained.',
      narrative: 'Traditional radio frequency channels are perpetually vulnerable to spectral sniffers, directional interception, and RF jamming blasts. WAVELINK was born from a radical thesis: what if the safest way to move digital tokens and cryptographic keys is not through radio waves, but through targeted, near-ultrasonic pressure waves in physical air?',
      tag: '0.00% RF EMISSIONS · PHYSICAL AIR-GAP ISOLATION',
      interactiveType: 'overview',
    },
    {
      id: 'slide-02',
      chapter: 'CHAPTER 02 // THE FREQUENCY HIGHWAY',
      title: 'The Untapped Acoustic Frontier: 18–24 kHz',
      authorQuote: 'Right above the boundary of human hearing lies an ultra-quiet acoustic spectrum where data can travel undetected.',
      narrative: 'Human ears typically taper off at 16–17 kHz. Consumer microphones and speakers, however, maintain exceptional sensitivity up to 24 kHz. WAVELINK claims this near-ultrasonic sweet spot, transmitting at 16.4 kbps with zero disturbance to humans or domestic animals.',
      tag: '18.0–24.0 kHz SPECTRUM · ZERO HUMAN AUDIBILITY',
      interactiveType: 'tuner',
    },
    {
      id: 'slide-03',
      chapter: 'CHAPTER 03 // THE MODULATION KEY',
      title: 'Sculpting Pure Sound: Continuous-Phase 2-FSK',
      authorQuote: 'Sharp square waves create audible switching clicks. We engineered smooth continuous sinusoidal trajectories.',
      narrative: 'To eliminate high-frequency acoustic distortion, WAVELINK employs Continuous-Phase Frequency-Shift Keying (CPFSK). Every bit transition glides smoothly along an uninterrupted polar phase trajectory, achieving an immaculate +32.4 dB signal-to-noise ratio.',
      tag: 'COHERENT MATCHED FILTER · +32.4 dB SNR DYNAMIC RANGE',
      interactiveType: 'constellation',
    },
    {
      id: 'slide-04',
      chapter: 'CHAPTER 04 // THE AIR-GAP HANDSHAKE',
      title: 'Bridging the Void: 64-Byte Framed Packets',
      authorQuote: 'Watch a 64-byte payload transform into sound pressure waves, leap across open space, and reassemble with zero errors.',
      narrative: 'Each transmission begins with a 32-bit Barker sync preamble (0xAA55AA55), followed by 48 bytes of encrypted application payload and an IEEE 802.3 CRC-32 checksum. The receiver demodulates and verifies each byte in real time with an undetected bit error rate below 10⁻¹².',
      tag: '12ms RECEPTION LATENCY · CRC-32 ERROR DETECTION',
      interactiveType: 'simulator',
    },
    {
      id: 'slide-05',
      chapter: 'CHAPTER 05 // THE HARSH ENVIRONMENT',
      title: 'Defying RF EMP Blasts & Doppler Shifts',
      authorQuote: 'When radio communications fail under high-energy electronic warfare, sound keeps moving unimpeded.',
      narrative: 'WAVELINK transceivers are immune to electromagnetic pulse (EMP) blasts that destroy conventional RF front-ends. Dual tracking loops actively estimate and compensate for Doppler velocity shifts up to 6.0 m/s in real time.',
      tag: '100 V/m EMP IMMUNITY · REAL-TIME DOPPLER TRACKING',
      interactiveType: 'impairment',
    },
    {
      id: 'slide-06',
      chapter: 'CHAPTER 06 // THE SOVEREIGN FRONTIER',
      title: 'Air-Gapped Telemetry for Critical Systems',
      authorQuote: 'From nuclear turbine control rooms to aerospace avionics, sound is the ultimate sovereign data conduit.',
      narrative: 'Experience full hardware integration with our enterprise Dev Kit. Includes 2x precision titanium transceiver modules, dual-core RISC-V DSP eval board, and complete C/Rust firmware SDK with instant license key provisioning.',
      tag: 'ENTERPRISE READY · C/RUST FIRMWARE SDK INCLUDED',
      interactiveType: 'devkit',
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      soundEngine.playClick();
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      soundEngine.playClick();
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Keyboard navigation for presentation slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="relative min-h-screen pt-28 pb-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full flex flex-col justify-between z-10 select-none">
      
      {/* Slide Top Chapter Pill & Progress Index */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
          <span className="font-mono text-xs sm:text-sm font-bold text-[#FF6B35] tracking-wider">
            {slide.chapter}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="text-white font-bold">SLIDE 0{currentSlide + 1}</span>
          <span>/</span>
          <span>0{slides.length}</span>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="flex-1 flex items-center w-full my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full"
          >
            
            {/* Left Column: Author Storytelling Storybook Card */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6 telemetry-glass p-6 sm:p-8">
              <div className="flex flex-col gap-4">
                <span className="text-[11px] font-mono text-[#FF6B35] font-bold px-3 py-1 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/25 w-fit">
                  {slide.tag}
                </span>

                <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                  {slide.title}
                </h1>

                {/* Author Quote Callout */}
                <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-[#FF6B35] font-sans italic text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "{slide.authorQuote}"
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  {slide.narrative}
                </p>
              </div>

              {/* Action Trigger */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                {currentSlide === 0 && (
                  <button
                    onClick={() => {
                      soundEngine.playThud(!isExplodedView);
                      toggleExplodedView();
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#FF6B35]/20 text-slate-300 hover:text-white border border-white/15 font-mono text-xs transition-colors cursor-pointer"
                  >
                    {isExplodedView ? 'COLLAPSE 3D CAD' : 'EXPLODE 3D CAD'}
                  </button>
                )}

                {currentSlide === slides.length - 1 && onOpenDevKitModal && (
                  <TactileButton
                    onClick={onOpenDevKitModal}
                    variant="primary"
                    icon={<ArrowRightIcon size={14} color="#0E0E12" />}
                  >
                    REQUEST DEV KIT v2
                  </TactileButton>
                )}

                <span className="text-[11px] font-mono text-slate-500 ml-auto hidden sm:inline">
                  USE ← → ARROWS TO GLIDE
                </span>
              </div>
            </div>

            {/* Right Column: Live Interactive Hardware Widget */}
            <div className="lg:col-span-7 flex flex-col justify-center items-stretch telemetry-glass p-6 sm:p-8">
              {slide.interactiveType === 'overview' && (
                <div className="flex flex-col gap-6 justify-between h-full">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3 font-mono text-xs text-slate-400">
                    <span>LIVE OSCILLOSCOPE MONITOR</span>
                    <SpectrumBars barsCount={8} />
                  </div>
                  <OscilloscopeStrip height={90} />

                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex flex-col gap-1">
                      <span className="text-slate-500 text-[10px]">RF EMISSION</span>
                      <strong className="text-emerald-400 text-sm">0.00% (Air-Gapped)</strong>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/30 flex flex-col gap-1">
                      <span className="text-[#FF6B35] text-[10px]">ACOUSTIC CARRIER</span>
                      <strong className="text-[#FF6B35] text-sm">20.4 kHz Center</strong>
                    </div>
                  </div>
                </div>
              )}

              {slide.interactiveType === 'tuner' && (
                <div className="flex flex-col gap-6 justify-between h-full">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3 font-mono text-xs text-slate-400">
                    <span>PIEZO HARMONIC FREQUENCY TUNER</span>
                    <span className="text-[#FF6B35] font-bold text-sm">{carrierFreq} kHz</span>
                  </div>

                  <div className="flex flex-col gap-3 p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">TUNE CARRIER FREQUENCY:</span>
                      <span className="text-[#FF6B35] font-bold">{carrierFreq} kHz</span>
                    </div>
                    <input
                      type="range"
                      min={18.0}
                      max={24.0}
                      step={0.1}
                      value={carrierFreq}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setCarrierFreq(val);
                        soundEngine.playPiezoChirp(val);
                      }}
                      className="w-full accent-[#FF6B35] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>18.0 kHz (Near-Sonic)</span>
                      <span>24.0 kHz (Full Ultrasonic)</span>
                    </div>
                  </div>

                  <OscilloscopeStrip height={80} />
                </div>
              )}

              {slide.interactiveType === 'constellation' && (
                <div className="flex flex-col gap-4 justify-between h-full">
                  <ConstellationPlot />
                </div>
              )}

              {slide.interactiveType === 'simulator' && (
                <div className="flex flex-col gap-4 justify-between h-full">
                  <PacketSimulator />
                </div>
              )}

              {slide.interactiveType === 'impairment' && (
                <div className="flex flex-col gap-4 justify-between h-full">
                  <ImpairmentSandbox />
                </div>
              )}

              {slide.interactiveType === 'devkit' && (
                <div className="flex flex-col gap-5 justify-between h-full font-mono text-xs">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-slate-400">WAVELINK DEV KIT HARDWARE SPEC</span>
                    <span className="text-[#FF6B35] font-bold">READY TO DEPLOY</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-col gap-1">
                      <span className="text-slate-500 text-[10px]">TRANSCEIVERS</span>
                      <p className="text-white font-bold text-sm">2x Titanium Transducers</p>
                    </div>
                    <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-col gap-1">
                      <span className="text-slate-500 text-[10px]">DSP ACCELERATOR</span>
                      <p className="text-white font-bold text-sm">Dual-Core RV32IMC</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FF6B35]/[0.06] border border-[#FF6B35]/30 flex flex-col gap-2">
                    <span className="text-[#FF6B35] text-[11px] font-bold">C / RUST SDK FIRMWARE SNIPPET:</span>
                    <code className="text-[11px] text-slate-300 font-mono">
                      wavelink_init(&config);<br />
                      wavelink_transmit_frame(dev, "AIRGAP_KEY_0x9F");
                    </code>
                  </div>
                </div>
              )}

            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Floating Keynote Slide Controller Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 floating-dock px-5 py-3 flex items-center gap-4 z-40 shadow-2xl">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
            currentSlide === 0 ? 'opacity-30 cursor-not-allowed text-slate-600' : 'bg-white/10 text-white hover:bg-[#FF6B35] hover:text-[#0E0E12]'
          }`}
        >
          ← PREV
        </button>

        {/* Slide Dots Indicator */}
        <div className="flex items-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                soundEngine.playClick();
                setCurrentSlide(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'bg-[#FF6B35] w-6' : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
            currentSlide === slides.length - 1 ? 'opacity-30 cursor-not-allowed text-slate-600' : 'bg-white/10 text-white hover:bg-[#FF6B35] hover:text-[#0E0E12]'
          }`}
        >
          NEXT →
        </button>
      </div>

    </div>
  );
};

export default StoryDeck;
