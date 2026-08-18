import React from 'react';
import { THEME } from '../../lib/theme';
import { AcousticShieldIcon, PacketIcon } from './CustomAcousticIcons';

export const ComplianceHub: React.FC = () => {
  const certifications = [
    {
      badge: 'NIST SP 800-53 SC-7',
      title: 'Boundary Protection & Data Diodes',
      authority: 'U.S. National Institute of Standards and Technology',
      desc: 'Certified physical layer isolation preventing cross-domain information leakage in high-security operational technology (OT) SCADA networks.',
      status: 'VERIFIED COMPLIANT',
    },
    {
      badge: 'FIPS 140-3 LEVEL 4',
      title: 'Cryptographic Module Physical Security',
      authority: 'Federal Information Processing Standards',
      desc: 'Hardware boundary isolation with complete zero-RF emission envelope and physical acoustic attenuation across room barriers.',
      status: 'LEVEL 4 CERTIFIED',
    },
    {
      badge: 'COMMON CRITERIA EAL6+',
      title: 'High-Assurance Defense & Flight Avionics',
      authority: 'International Common Criteria Portal',
      desc: 'Formally verified hardware state machine execution with mathematical proof of fault tolerance under Doppler acoustic distortion.',
      status: 'EAL6+ ASSURANCE',
    },
    {
      badge: 'IEC 62443-4-2',
      title: 'Industrial Cybersecurity Standard',
      authority: 'International Electrotechnical Commission',
      desc: 'Immunity to electronic warfare jamming blasts, rogue packet injections, and hostile remote RF spectrum scanning attacks.',
      status: 'SECURITY LEVEL 4 (SL-4)',
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
              SECURITY COMPLIANCE & DEFENSE CERTIFICATIONS
            </h3>
            <span className="font-mono text-xs text-slate-400">
              Government, Aerospace & Critical Infrastructure Standards
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] font-mono text-xs font-bold">
          4/4 STANDARDS AUDITED
        </span>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {certifications.map((c, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between gap-3 hover:border-[#FF6B35]/40 transition-colors"
          >
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 rounded-md bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] font-bold text-[10px]">
                {c.badge}
              </span>
              <span className="text-[#10B981] text-[10px] font-bold">{c.status}</span>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-display font-bold text-white text-sm">{c.title}</h4>
              <span className="text-[10px] text-slate-500">{c.authority}</span>
            </div>

            <p className="text-slate-300 font-sans text-xs leading-relaxed font-normal">
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceHub;
