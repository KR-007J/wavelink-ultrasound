import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../lib/theme';
import { TelemetryPanel } from '../components/telemetry/TelemetryPanel';
import {
  AcousticShieldIcon,
  HandshakeIcon,
  TransducerIcon,
  PacketIcon,
  ArrowRightIcon,
} from '../components/telemetry/CustomAcousticIcons';

export const ShowcasePage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const cases = [
    {
      icon: AcousticShieldIcon,
      title: 'Air-Gapped SCADA Data Diode',
      sector: 'Critical Infrastructure & Energy',
      metric: '0.00% RF EMISSION',
      summary: 'Isolating operational technology (OT) turbine controllers from external networks while continuously streaming vibration and thermal telemetry to monitoring gateways across a 3.2m physical room air-gap.',
      throughput: '16.4 kbps',
      latency: '12 ms',
      range: '3.2 Meters',
      security: 'Hardware Unidirectional Physical Isolation',
    },
    {
      icon: HandshakeIcon,
      title: 'Defense-Grade Proximity Provisioning',
      sector: 'Aerospace & Defense',
      metric: '< 15ms DISCOVERY',
      summary: 'Cryptographic key injection and mutual certificate exchange between flight computers and diagnostic test fixtures inside shielded hangars without activating RF transmitters.',
      throughput: '16.4 kbps',
      latency: '14 ms',
      range: '0.8 Meters',
      security: 'Room-Acoustic Physical Boundary Containment',
    },
    {
      icon: TransducerIcon,
      title: 'Sub-Surface Chassis IoT Mesh',
      sector: 'Data Center Infrastructure',
      metric: 'SOLID & AIR COMPLIANT',
      summary: 'Transmitting blade server telemetry directly through solid aluminum rack chassis frames using structural acoustic wave propagation, eliminating internal bus harness clutter.',
      throughput: '8.2 kbps',
      latency: '18 ms',
      range: '1.5 Meters (Solid)',
      security: 'Chassis Contact Guided Acoustic Waves',
    },
    {
      icon: PacketIcon,
      title: 'Offline POS Ultrasonic Handshake',
      sector: 'Fintech & Contactless Retail',
      metric: '99.98% SUCCESS RATE',
      summary: 'Peer-to-peer digital token exchange between standard smartphone speakers and point-of-sale microphone terminals without cellular network, Wi-Fi, or Bluetooth connectivity.',
      throughput: '16.4 kbps',
      latency: '15 ms',
      range: '1.2 Meters',
      security: 'Encrypted Ephemeral Acoustic Payloads',
    },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full z-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-6 mb-16">
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border w-fit"
          style={{
            backgroundColor: 'rgba(255, 107, 53, 0.08)',
            borderColor: 'rgba(255, 107, 53, 0.25)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#FF6B35] font-bold">
            ENTERPRISE DEPLOYMENTS
          </span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
          Field-Tested in <br />
          <span style={{ color: THEME.accent }}>Mission-Critical Environments.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
          Explore how enterprise leaders deploy WAVELINK across industrial SCADA, defense aerospace, and secure air-gapped infrastructure.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {cases.map((item, idx) => {
          const Icon = item.icon;
          return (
            <TelemetryPanel
              key={idx}
              tiltOnHover
              className="flex flex-col justify-between gap-6 p-8 cursor-pointer"
              onClick={() => setSelectedCase(idx)}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: 'rgba(255, 107, 53, 0.08)',
                        borderColor: 'rgba(255, 107, 53, 0.25)',
                      }}
                    >
                      <Icon size={20} color={THEME.accent} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">
                        {item.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">{item.sector}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-slate-300 font-normal">
                  {item.summary}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10 font-mono text-xs">
                <span className="text-slate-500">SPECIFICATION:</span>
                <span className="text-[#FF6B35] font-bold">{item.metric}</span>
              </div>
            </TelemetryPanel>
          );
        })}
      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedCase !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full telemetry-glass p-8 md:p-10 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-display font-black text-2xl text-white">
                    {cases[selectedCase].title}
                  </h3>
                  <span className="font-mono text-xs text-[#FF6B35]">{cases[selectedCase].sector}</span>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 text-white font-mono text-xs flex items-center justify-center cursor-pointer hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              <p className="text-base text-slate-300 leading-relaxed font-normal">
                {cases[selectedCase].summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs">
                <div>
                  <span className="text-slate-500">THROUGHPUT</span>
                  <p className="text-white font-bold">{cases[selectedCase].throughput}</p>
                </div>
                <div>
                  <span className="text-slate-500">LATENCY</span>
                  <p className="text-white font-bold">{cases[selectedCase].latency}</p>
                </div>
                <div>
                  <span className="text-slate-500">RANGE</span>
                  <p className="text-white font-bold">{cases[selectedCase].range}</p>
                </div>
                <div>
                  <span className="text-slate-500">CONTAINMENT</span>
                  <p className="text-[#FF6B35] font-bold">{cases[selectedCase].metric}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="font-mono text-xs text-slate-400">Security Mode: {cases[selectedCase].security}</span>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: THEME.accent,
                    color: '#0E0E12',
                  }}
                >
                  <span>CLOSE MODAL</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ShowcasePage;
