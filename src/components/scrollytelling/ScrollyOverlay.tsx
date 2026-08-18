import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { OscilloscopeStrip } from '../telemetry/OscilloscopeStrip';
import { SpectrumBars } from '../telemetry/SpectrumBars';
import { audioSynth } from '../../lib/audioSynthesizer';
import {
  WaveformIcon,
  PacketIcon,
  SlidersIcon,
  ArrowRightIcon,
} from '../telemetry/CustomAcousticIcons';

export const ScrollyOverlay: React.FC = () => {
  const scrollProgress = useWavelinkStore((s) => s.scrollProgress);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const setCarrierFreq = useWavelinkStore((s) => s.setCarrierFreq);
  const packetSnr = useWavelinkStore((s) => s.packetSnr);
  const decodeLatency = useWavelinkStore((s) => s.decodeLatency);

  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const handleToggleAudio = () => {
    const muted = audioSynth.toggleMute();
    setIsAudioMuted(muted);
    audioSynth.setFrequency(carrierFreq);
  };

  const handleFreqChange = (freq: number) => {
    setCarrierFreq(freq);
    audioSynth.setFrequency(freq);
  };

  const chapters = [
    { label: 'HERO', title: 'Carrier Initialization' },
    { label: 'EMIT', title: 'Transducer Diaphragm' },
    { label: 'MODULATE', title: 'FSK Bit Encoding' },
    { label: 'PROPAGATE', title: 'Acoustic Wavefronts' },
    { label: 'DEMODULATE', title: 'FFT Spectral Peak' },
    { label: 'DECODE', title: 'Frame Assembly' },
    { label: 'SPECS', title: 'Hardware Data Sheet' },
  ];

  const currentChapter = Math.min(Math.floor(scrollProgress * chapters.length), chapters.length - 1);

  const getChapterTransition = (chapterIdx: number) => {
    if (chapterIdx === 3) {
      return { duration: 0.4, ease: [0.04, 0.9, 0.2, 1] };
    } else if (chapterIdx === 5) {
      return { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
    }
    return { duration: 0.55, ease: [0.16, 1, 0.3, 1] };
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between px-6 md:px-12 py-24 max-w-7xl mx-auto w-full">
      
      {/* 1. Left-Edge Vertical Chapter Progress Spine HUD */}
      <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 pointer-events-auto z-30 font-mono text-[10px]">
        
        {/* Audio Carrier Tone Synthesizer Toggle */}
        <button
          onClick={handleToggleAudio}
          title="Toggle Synthesized Carrier Tone"
          className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
            !isAudioMuted
              ? 'bg-[#FF6B35]/15 border-[#FF6B35] text-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.4)]'
              : 'bg-white/[0.02] border-white/10 text-slate-500 hover:text-white'
          }`}
        >
          {!isAudioMuted ? '🔊' : '🔇'}
        </button>

        {/* Vertical Spine with Chapter Nodes */}
        <div className="relative flex flex-col items-center gap-4 py-2">
          <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 left-1/2 -translate-x-1/2" />

          {chapters.map((ch, idx) => {
            const isActive = currentChapter === idx;
            const isPast = currentChapter > idx;

            return (
              <div key={ch.label} className="relative flex items-center gap-3 group">
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 z-10 ${
                    isActive
                      ? 'bg-[#FF6B35] scale-125 shadow-[0_0_12px_#FF6B35]'
                      : isPast
                      ? 'bg-white/40'
                      : 'bg-white/10'
                  }`}
                />

                {/* Chapter Tooltip Label */}
                <span
                  className={`absolute left-6 whitespace-nowrap tracking-wider transition-all uppercase ${
                    isActive
                      ? 'text-[#FF6B35] font-bold opacity-100'
                      : 'text-slate-500 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {ch.label}
                </span>
              </div>
            );
          })}
        </div>

        <span className="text-[9px] text-slate-500 tracking-widest uppercase writing-mode-vertical rotate-180">
          EPISODE 0{currentChapter + 1}
        </span>
      </div>

      {/* 2. Top Chapter Indicator Navigation Bar */}
      <div className="flex items-center justify-between pt-2 pointer-events-auto w-full">
        <div className="flex items-center gap-2">
          {chapters.map((item, idx) => (
            <div
              key={item.label}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentChapter === idx
                  ? 'w-10 bg-[#FF6B35] shadow-[0_0_10px_#FF6B35]'
                  : 'w-3 bg-white/20'
              }`}
            />
          ))}
        </div>

        <span className="font-mono text-xs text-[#FF6B35] font-bold">
          CH 0{currentChapter + 1} // {chapters[currentChapter].label}
        </span>
      </div>

      {/* 3. Main Dynamic Chapter Stage */}
      <div className="flex-1 flex items-center w-full my-auto">
        <AnimatePresence mode="wait">
          
          {/* CHAPTER 0: HERO */}
          {currentChapter === 0 && (
            <motion.div
              key="chapter-0"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)', y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 0.5, filter: 'blur(40px)', y: -20 }}
              transition={getChapterTransition(0)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full"
            >
              <div className="lg:col-span-8 flex flex-col justify-between gap-8 hero-glass p-8 md:p-12 pointer-events-auto">
                <div className="flex flex-col gap-6">
                  <div
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border w-fit"
                    style={{
                      backgroundColor: 'rgba(255, 107, 53, 0.08)',
                      borderColor: 'rgba(255, 107, 53, 0.25)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#FF6B35] font-bold">
                      NEAR-ULTRASONIC · 18–24 kHz
                    </span>
                  </div>

                  <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.04]">
                    DATA, CARRIED <br />
                    <span style={{ color: THEME.accent }}>ON SOUND.</span>
                  </h1>

                  <p className="text-base md:text-lg max-w-2xl font-normal leading-relaxed text-slate-300">
                    WAVELINK transforms standard audio speakers and microphones into air-gapped data transceivers via near-ultrasonic acoustic waves with zero RF emissions.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-slate-400">
                    Scroll down to explore the 3D hardware pipeline
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-6 justify-between items-stretch pointer-events-auto">
                <TelemetryPanel className="flex-1 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <WaveformIcon size={18} color={THEME.accent} />
                      <span>CARRIER OSCILLOSCOPE</span>
                    </div>
                    <SpectrumBars barsCount={8} />
                  </div>
                  <OscilloscopeStrip height={65} />
                </TelemetryPanel>
              </div>
            </motion.div>
          )}

          {/* CHAPTER 1: EMIT */}
          {currentChapter === 1 && (
            <motion.div
              key="chapter-1"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)', y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 0.5, filter: 'blur(40px)', y: -20 }}
              transition={getChapterTransition(1)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full"
            >
              <div className="lg:col-span-7 flex flex-col justify-between gap-8 telemetry-glass p-8 md:p-12 pointer-events-auto">
                <div className="flex flex-col gap-6">
                  <span
                    className="text-xs font-mono tracking-widest uppercase font-bold px-3.5 py-1 rounded-md border w-fit"
                    style={{
                      backgroundColor: 'rgba(255, 107, 53, 0.08)',
                      borderColor: 'rgba(255, 107, 53, 0.25)',
                      color: THEME.accent,
                    }}
                  >
                    PIPELINE 01 // EMIT (CLOSE MACRO INSPECTION)
                  </span>

                  <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
                    Piezoelectric Acoustic Conversion
                  </h2>

                  <p className="text-base leading-relaxed text-slate-300 font-normal">
                    Digital bit streams drive micro-voltage pulses into a lead zirconate titanate (PZT) ceramic element, generating continuous near-ultrasonic pressure waves.
                  </p>
                </div>

                <div className="flex flex-col gap-4 bg-black/40 p-6 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <SlidersIcon size={18} color={THEME.accent} />
                      <span className="font-bold text-white">CARRIER FREQUENCY CONTROL:</span>
                    </div>
                    <span className="text-[#FF6B35] font-black text-lg">{carrierFreq} kHz</span>
                  </div>

                  <input
                    type="range"
                    min="18.0"
                    max="24.0"
                    step="0.1"
                    value={carrierFreq}
                    onChange={(e) => handleFreqChange(parseFloat(e.target.value))}
                    className="w-full accent-[#FF6B35] cursor-pointer h-2 bg-white/10 rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* CHAPTER 2: MODULATE */}
          {currentChapter === 2 && (
            <motion.div
              key="chapter-2"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)', y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 0.5, filter: 'blur(40px)', y: -20 }}
              transition={getChapterTransition(2)}
              className="flex flex-col gap-8 w-full pointer-events-auto"
            >
              <div className="flex flex-col gap-4 max-w-2xl">
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold px-3.5 py-1 rounded-md border w-fit"
                  style={{
                    backgroundColor: 'rgba(255, 107, 53, 0.08)',
                    borderColor: 'rgba(255, 107, 53, 0.25)',
                    color: THEME.accent,
                  }}
                >
                  PIPELINE 02 // MODULATE
                </span>

                <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
                  Frequency-Shift Keyed Encoding
                </h2>

                <p className="text-base text-slate-300 font-normal">
                  Binary payloads are encoded via dual-tone 2-FSK (Mark: 19.5 kHz, Space: 21.5 kHz) with zero audible distortion.
                </p>
              </div>

              <TelemetryPanel className="flex flex-col gap-6 w-full">
                <div className="grid grid-cols-8 gap-3 font-mono text-center">
                  {['1', '0', '1', '1', '0', '0', '1', '0'].map((bit, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border flex flex-col items-center justify-center bg-white/[0.02] border-white/10"
                    >
                      <span className={`text-xl font-black ${bit === '1' ? 'text-[#FF6B35]' : 'text-slate-400'}`}>
                        {bit}
                      </span>
                    </div>
                  ))}
                </div>
              </TelemetryPanel>
            </motion.div>
          )}

          {/* CHAPTER 3: PROPAGATE */}
          {currentChapter === 3 && (
            <motion.div
              key="chapter-3"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)', y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 0.5, filter: 'blur(40px)', y: -20 }}
              transition={getChapterTransition(3)}
              className="flex flex-col gap-8 w-full pointer-events-auto"
            >
              <div className="flex flex-col gap-4 max-w-2xl">
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold px-3.5 py-1 rounded-md border w-fit"
                  style={{
                    backgroundColor: 'rgba(255, 107, 53, 0.08)',
                    borderColor: 'rgba(255, 107, 53, 0.25)',
                    color: THEME.accent,
                  }}
                >
                  PIPELINE 03 // PROPAGATE (WIDE ACOUSTIC WAVEFRONT)
                </span>

                <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
                  Air-Gap Wavefront Expansion
                </h2>

                <p className="text-base text-slate-300 font-normal">
                  Acoustic pressure waves expand spherically at 343 m/s across the physical air gap toward the receiver node.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Air-Gapped Diode', metric: 'ZERO RF EMISSION' },
                  { title: 'Proximity Handshake', metric: '< 15ms LATENCY' },
                  { title: 'Chassis Telemetry', metric: 'SOLID & AIR COMPLIANT' },
                ].map((item, idx) => (
                  <TelemetryPanel key={idx} className="flex flex-col justify-between gap-4 p-6">
                    <span className="font-bold text-white text-lg">{item.title}</span>
                    <span className="font-mono text-xs text-[#FF6B35] font-bold">{item.metric}</span>
                  </TelemetryPanel>
                ))}
              </div>
            </motion.div>
          )}

          {/* CHAPTER 4: DEMODULATE */}
          {currentChapter === 4 && (
            <motion.div
              key="chapter-4"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)', y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 0.5, filter: 'blur(40px)', y: -20 }}
              transition={getChapterTransition(4)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full pointer-events-auto"
            >
              <div className="lg:col-span-6 flex flex-col justify-between gap-6 telemetry-glass p-8 md:p-12">
                <div className="flex flex-col gap-4">
                  <span
                    className="text-xs font-mono tracking-widest uppercase font-bold px-3.5 py-1 rounded-md border w-fit"
                    style={{
                      backgroundColor: 'rgba(255, 107, 53, 0.08)',
                      borderColor: 'rgba(255, 107, 53, 0.25)',
                      color: THEME.accent,
                    }}
                  >
                    PIPELINE 04 // DEMODULATE (RECEIVER FOCUS)
                  </span>

                  <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
                    FFT Spectrum Extraction
                  </h2>

                  <p className="text-sm leading-relaxed text-slate-300 font-normal">
                    Receiving MEMS mic samples ambient audio at 48 kHz / 24-bit, using a 1024-point FFT pipeline to isolate carrier peaks.
                  </p>
                </div>

                <div className="flex justify-between items-center font-mono text-xs bg-black/40 p-4 rounded-xl border border-white/10">
                  <span>SNR: <strong className="text-[#FF6B35]">+{packetSnr} dB</strong></span>
                  <span>DECODE: <strong className="text-white">{decodeLatency} ms</strong></span>
                </div>
              </div>
            </motion.div>
          )}

          {/* CHAPTER 5: DECODE */}
          {currentChapter === 5 && (
            <motion.div
              key="chapter-5"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)', y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 0.5, filter: 'blur(40px)', y: -20 }}
              transition={getChapterTransition(5)}
              className="flex flex-col gap-8 w-full pointer-events-auto"
            >
              <div className="flex flex-col gap-4 max-w-2xl">
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold px-3.5 py-1 rounded-md border w-fit"
                  style={{
                    backgroundColor: 'rgba(255, 107, 53, 0.08)',
                    borderColor: 'rgba(255, 107, 53, 0.25)',
                    color: THEME.accent,
                  }}
                >
                  PIPELINE 05 // DECODE (DUAL ALIGNMENT)
                </span>

                <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
                  Frame Assembly & CRC Validation
                </h2>
              </div>

              <TelemetryPanel className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] text-slate-500">PREAMBLE [4B]</span>
                  <p className="text-base font-black text-[#FF6B35]">0xAA55AA55</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] text-slate-500">HEADER [8B]</span>
                  <p className="text-base font-black text-white">0x01 · LEN:48</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FF6B35]/[0.05] border border-[#FF6B35]/30">
                  <span className="text-[10px] text-[#FF6B35]">PAYLOAD [48B]</span>
                  <p className="text-base font-black text-white truncate">4A 6F 68 6E</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <span className="text-[10px] text-slate-500">CRC-32 [4B]</span>
                  <p className="text-base font-black text-[#10B981]">0x8F9B201A</p>
                </div>
              </TelemetryPanel>
            </motion.div>
          )}

          {/* CHAPTER 6: SPEC SHEET & DEPLOY */}
          {currentChapter === 6 && (
            <motion.div
              key="chapter-6"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)', y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, scale: 0.5, filter: 'blur(40px)', y: -20 }}
              transition={getChapterTransition(6)}
              className="flex flex-col gap-6 w-full pointer-events-auto"
            >
              <div className="flex flex-col gap-3 max-w-2xl">
                <span
                  className="text-xs font-mono tracking-widest uppercase font-bold px-3.5 py-1 rounded-md border w-fit"
                  style={{
                    backgroundColor: 'rgba(255, 107, 53, 0.08)',
                    borderColor: 'rgba(255, 107, 53, 0.25)',
                    color: THEME.accent,
                  }}
                >
                  PIPELINE 06 // SPECIFICATIONS & DEPLOYMENT
                </span>

                <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
                  WAVELINK Hardware Data Sheet
                </h2>
              </div>

              <TelemetryPanel className="p-6 flex flex-col gap-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-slate-500">CARRIER BAND</span>
                    <p className="text-white font-bold">18.0–24.0 kHz</p>
                  </div>
                  <div>
                    <span className="text-slate-500">RANGE</span>
                    <p className="text-white font-bold">0.1–5.0 Meters</p>
                  </div>
                  <div>
                    <span className="text-slate-500">THROUGHPUT</span>
                    <p className="text-[#FF6B35] font-bold">16.4 kbps</p>
                  </div>
                  <div>
                    <span className="text-slate-500">POWER</span>
                    <p className="text-white font-bold">0.08 mW Active</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="font-mono text-xs text-slate-400">WAVELINK Dev Kit v2 (2x Core Modules + C/Rust SDK)</span>
                  <button
                    className="px-6 py-3 rounded-xl font-mono text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                    style={{
                      backgroundColor: THEME.accent,
                      color: '#0E0E12',
                      boxShadow: '0 0 25px -4px rgba(255, 107, 53, 0.5)',
                    }}
                  >
                    <span>REQUEST DEV KIT</span>
                    <ArrowRightIcon size={14} color="#0E0E12" />
                  </button>
                </div>
              </TelemetryPanel>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 4. Persistent Status Telemetry Ticker */}
      <div className="flex justify-between items-center text-xs font-mono text-slate-500 border-t border-white/10 pt-4 pointer-events-auto">
        <span>CHAPTER 0{currentChapter + 1} OF 07</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
          <span className="text-[#FF6B35] font-bold">SIGNAL LOCKED · {carrierFreq} kHz</span>
        </div>
      </div>

    </div>
  );
};

export default ScrollyOverlay;
