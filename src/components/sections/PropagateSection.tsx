import React from 'react';
import { THEME } from '../../lib/theme';
import { TelemetryPanel } from '../telemetry/TelemetryPanel';
import { HandshakeIcon, AcousticShieldIcon, TransducerIcon } from '../telemetry/CustomAcousticIcons';

export const PropagateSection: React.FC = () => {
  const useCases = [
    {
      icon: AcousticShieldIcon,
      title: 'Air-Gapped Data Diode',
      desc: 'Transmit telemetry and cryptographic keys across physical air gaps without physical copper wires or vulnerable Wi-Fi / Bluetooth antennas.',
      metric: 'ZERO RF EMISSION',
    },
    {
      icon: HandshakeIcon,
      title: 'Proximity Handshake',
      desc: 'Instant peer-to-peer device discovery and credential provisioning verified strictly by physical room acoustics (0–5 meter containment).',
      metric: '< 15ms DISCOVERY',
    },
    {
      icon: TransducerIcon,
      title: 'Sub-Surface Acoustic Mesh',
      desc: 'Propagation through solid server chassis frames and enclosure metals, enabling embedded hardware monitoring without bus overhead.',
      metric: 'AIR & SOLID COMPLIANT',
    },
  ];

  return (
    <section id="propagate" className="relative min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 py-24 z-10 pointer-events-auto">
      <div className="flex flex-col gap-12 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <span
            className="text-xs font-mono tracking-widest uppercase font-bold px-3.5 py-1 rounded-md border w-fit"
            style={{
              backgroundColor: 'rgba(0, 229, 255, 0.05)',
              borderColor: 'rgba(0, 229, 255, 0.2)',
              color: THEME.accent,
            }}
          >
            PIPELINE 03 // PROPAGATE
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
            Air-Gap Acoustic Wavefront Travel
          </h2>

          <p className="text-base text-slate-300 font-normal">
            Acoustic waves propagate spherically at 343 m/s through ambient atmosphere. Bounded naturally by physical walls, ultrasonic transmission guarantees zero signal bleeding beyond room perimeter boundaries.
          </p>
        </div>

        {/* 3 Matched-Height Deployment Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <TelemetryPanel
                key={idx}
                tiltOnHover
                className="md:col-span-4 flex flex-col justify-between gap-8 h-full"
              >
                <div className="flex flex-col gap-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                    style={{
                      backgroundColor: 'rgba(0, 229, 255, 0.08)',
                      borderColor: 'rgba(0, 229, 255, 0.25)',
                    }}
                  >
                    <Icon size={22} color={THEME.accent} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-xl text-white">
                      {uc.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400 font-normal">
                      {uc.desc}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-500">CONTAINMENT</span>
                  <span style={{ color: THEME.accent }} className="font-bold">
                    {uc.metric}
                  </span>
                </div>
              </TelemetryPanel>
            );
          })}
        </div>

      </div>

      {/* Engineering Rationale Box */}
      <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-400 max-w-7xl">
        <span className="text-[#00E5FF] font-bold mr-2">PIPELINE RATIONALE // PROPAGATE:</span>
        Models the physical medium stage where sound waves travel across the air gap. Unlike electromagnetic radio waves that penetrate walls, acoustic signals remain contained within physical structural boundaries.
      </div>
    </section>
  );
};

export default PropagateSection;
