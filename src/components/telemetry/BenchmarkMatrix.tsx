import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { soundEngine } from '../../lib/soundEngine';
import { AcousticShieldIcon, WaveformIcon, PacketIcon } from './CustomAcousticIcons';

export const BenchmarkMatrix: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'rf' | 'security' | 'power'>('all');

  const protocols = [
    {
      name: 'WAVELINK (Near-Ultrasonic)',
      highlight: true,
      rfEmission: '0.00% (Silent)',
      range: '0.5m – 3.2m',
      empImmunity: '100 V/m Impervious',
      containment: 'Physical Room Walls',
      power: '42 mW (Low)',
      attackSurface: 'Zero RF Vectors',
    },
    {
      name: 'Bluetooth Low Energy (BLE 5.3)',
      highlight: false,
      rfEmission: 'High (2.4 GHz Band)',
      range: '10m – 30m',
      empImmunity: 'Vulnerable (< 5 V/m)',
      containment: 'Bleeds through walls',
      power: '65 mW',
      attackSurface: 'RF Sniffing / MITM',
    },
    {
      name: 'Wi-Fi 7 (802.11be)',
      highlight: false,
      rfEmission: 'Extreme (2.4/5/6 GHz)',
      range: '50m – 100m',
      empImmunity: 'Vulnerable (< 2 V/m)',
      containment: 'Long-range perimeter leak',
      power: '850 mW (High)',
      attackSurface: 'SSID / Packet Injection',
    },
    {
      name: 'NFC (ISO/IEC 14443)',
      highlight: false,
      rfEmission: 'Moderate (13.56 MHz)',
      range: '< 0.04m (Touch only)',
      empImmunity: 'Moderate (15 V/m)',
      containment: 'Touch contact only',
      power: '50 mW',
      attackSurface: 'Relay / Skimming',
    },
    {
      name: 'Optical Li-Fi (850nm IR)',
      highlight: false,
      rfEmission: '0.00% (Optical)',
      range: '1.0m – 2.5m (LOS only)',
      empImmunity: 'Impervious',
      containment: 'Line of sight only',
      power: '320 mW',
      attackSurface: 'Optical Occlusion / Dust',
    },
  ];

  return (
    <div className="flex flex-col gap-6 telemetry-glass p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/30 flex items-center justify-center">
            <AcousticShieldIcon size={20} color={THEME.accent} />
          </div>
          <div>
            <h3 className="font-display font-black text-lg text-white">
              ENTERPRISE PROTOCOL BENCHMARK & COMPARISON MATRIX
            </h3>
            <span className="font-mono text-xs text-slate-400">
              Hardware Physical Layer Threat Vector & Performance Analysis
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 font-mono text-xs">
          {(['all', 'rf', 'security', 'power'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                soundEngine.playClick();
                setSelectedMetric(m);
              }}
              className={`px-3 py-1 rounded-lg uppercase transition-colors cursor-pointer ${
                selectedMetric === m
                  ? 'bg-[#FF6B35] text-[#0E0E12] font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 text-[11px]">
              <th className="py-3 px-4">PROTOCOL</th>
              <th className="py-3 px-4">RF EMISSION</th>
              <th className="py-3 px-4">EFFECTIVE RANGE</th>
              <th className="py-3 px-4">EMP IMMUNITY</th>
              <th className="py-3 px-4">CONTAINMENT</th>
              <th className="py-3 px-4">POWER DRAW</th>
              <th className="py-3 px-4">ATTACK SURFACE</th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((p, idx) => (
              <tr
                key={idx}
                className={`border-b border-white/5 transition-colors ${
                  p.highlight
                    ? 'bg-[#FF6B35]/[0.08] text-white font-bold'
                    : 'text-slate-300 hover:bg-white/[0.02]'
                }`}
              >
                <td className="py-3.5 px-4 flex items-center gap-2">
                  {p.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />}
                  <span className={p.highlight ? 'text-[#FF6B35]' : 'text-slate-200'}>{p.name}</span>
                </td>
                <td className="py-3.5 px-4">{p.rfEmission}</td>
                <td className="py-3.5 px-4">{p.range}</td>
                <td className="py-3.5 px-4">{p.empImmunity}</td>
                <td className="py-3.5 px-4">{p.containment}</td>
                <td className="py-3.5 px-4">{p.power}</td>
                <td className="py-3.5 px-4">
                  <span className={p.highlight ? 'text-[#10B981]' : 'text-slate-400'}>
                    {p.attackSurface}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Executive Key Takeaway */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span className="text-slate-300">
            <strong>ENTERPRISE CONCLUSION:</strong> WAVELINK provides unmatched physical perimeter containment and 0% RF footprint for classified and air-gapped workloads.
          </span>
        </div>
        <span className="text-[#FF6B35] font-bold shrink-0">NIST SP 800-53 COMPLIANT</span>
      </div>
    </div>
  );
};

export default BenchmarkMatrix;
