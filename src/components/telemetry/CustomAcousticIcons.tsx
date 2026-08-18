import React from 'react';
import { THEME } from '../../lib/theme';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Custom Precision Transducer Logomark
export const TransducerIcon: React.FC<IconProps> = ({ className = '', size = 24, color = THEME.accent }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" />
    <circle cx="16" cy="16" r="9" stroke={color} strokeWidth="1.2" strokeDasharray="3 3" />
    <circle cx="16" cy="16" r="4.5" stroke={color} strokeWidth="1.5" fill={`${color}26`} />
    <circle cx="16" cy="16" r="1.5" fill={color} />
    <path d="M16 2V6M16 26V30M2 16H6M26 16H30" stroke={color} strokeWidth="1.5" />
  </svg>
);

// Custom Carrier Waveform Icon
export const WaveformIcon: React.FC<IconProps> = ({ className = '', size = 20, color = THEME.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M2 12C4.5 4 7.5 4 10 12C12.5 20 15.5 20 18 12C19.5 7 21 7 22 12"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// Custom FFT Spectrum Bars Icon
export const FftIcon: React.FC<IconProps> = ({ className = '', size = 20, color = THEME.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="14" width="2.5" height="7" fill={color} />
    <rect x="7.5" y="8" width="2.5" height="13" fill={color} />
    <rect x="12" y="4" width="2.5" height="17" fill={color} />
    <rect x="16.5" y="11" width="2.5" height="10" fill={color} />
    <rect x="21" y="16" width="2.5" height="5" fill={color} />
  </svg>
);

// Custom Data Packet Frame Icon
export const PacketIcon: React.FC<IconProps> = ({ className = '', size = 20, color = THEME.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M8 5V19M16 5V19" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" />
    <circle cx="5.5" cy="12" r="1" fill={color} />
    <circle cx="12" cy="12" r="1.5" fill={color} />
    <circle cx="18.5" cy="12" r="1" fill={color} />
  </svg>
);

// Custom Handshake Ping Icon
export const HandshakeIcon: React.FC<IconProps> = ({ className = '', size = 20, color = THEME.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="6" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="18" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M9 10C11 8 13 8 15 10M9 14C11 16 13 16 15 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Custom Acoustic Shield Security Icon
export const AcousticShieldIcon: React.FC<IconProps> = ({ className = '', size = 20, color = THEME.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L20 6V12C20 17 16.5 21 12 22C7.5 21 4 17 4 12V6L12 2Z" stroke={color} strokeWidth="1.5" />
    <path d="M8 12C9.5 9.5 14.5 9.5 16 12C14.5 14.5 9.5 14.5 8 12Z" stroke={color} strokeWidth="1.2" />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
);

// Custom Arrow Right Icon
export const ArrowRightIcon: React.FC<IconProps> = ({ className = '', size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke={color} strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

// Custom Sliders Control Icon
export const SlidersIcon: React.FC<IconProps> = ({ className = '', size = 20, color = THEME.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 8H20M4 16H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <rect x="7" y="6" width="3" height="4" rx="1" fill={color} />
    <rect x="14" y="14" width="3" height="4" rx="1" fill={color} />
  </svg>
);
