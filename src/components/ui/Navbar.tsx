import React, { useState, useEffect } from 'react';
import { THEME } from '../../lib/theme';
import { TransducerIcon, ArrowRightIcon } from '../telemetry/CustomAcousticIcons';
import { useWavelinkStore } from '../../store/useWavelinkStore';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'OVERVIEW', id: 'home' },
    { label: 'ORIGIN', id: 'origin' },
    { label: 'MECHANICS', id: 'mechanics' },
    { label: 'SHOWCASE', id: 'showcase' },
    { label: 'DEPLOY', id: 'deploy' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[72px] z-50 px-6 md:px-12 flex items-center transition-all duration-300 pointer-events-auto ${
        isScrolled
          ? 'bg-[#0E0E12]/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-8">
        
        {/* Brand Logomark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity cursor-pointer text-left"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border"
            style={{
              backgroundColor: 'rgba(255, 107, 53, 0.08)',
              borderColor: 'rgba(255, 107, 53, 0.25)',
              boxShadow: '0 0 20px -3px rgba(255, 107, 53, 0.3)',
            }}
          >
            <TransducerIcon size={24} color={THEME.accent} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-sm tracking-widest text-white leading-none">
              WAVELINK<span style={{ color: THEME.accent }}>.IO</span>
            </span>
            <span className="text-[9px] font-mono text-slate-400 tracking-wider">ULTRASOUND CHIPSET</span>
          </div>
        </button>

        {/* Live Carrier Frequency Telemetry Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
          <span className="text-slate-400">CARRIER:</span>
          <span className="text-[#FF6B35] font-bold">{carrierFreq} kHz</span>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`transition-colors tracking-wider cursor-pointer ${
                currentPage === link.id
                  ? 'text-[#FF6B35] font-bold border-b border-[#FF6B35] pb-1'
                  : 'hover:text-white text-slate-400'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action CTA Button */}
        <button
          onClick={() => onNavigate('deploy')}
          className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-all relative overflow-hidden"
          style={{
            backgroundColor: THEME.accent,
            color: '#0E0E12',
            boxShadow: '0 0 25px -4px rgba(255, 107, 53, 0.5)',
          }}
        >
          <span>DEV KIT</span>
          <ArrowRightIcon size={14} color="#0E0E12" />
        </button>

      </div>
    </header>
  );
};

export default Navbar;
