import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { TransducerIcon, ArrowRightIcon } from '../telemetry/CustomAcousticIcons';
import { useWavelinkStore } from '../../store/useWavelinkStore';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
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

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[72px] z-50 px-4 sm:px-8 md:px-12 flex items-center transition-all duration-300 pointer-events-auto ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#0E0E12]/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        
        {/* Brand Logomark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 text-white hover:opacity-90 transition-opacity cursor-pointer text-left shrink-0"
        >
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border"
            style={{
              backgroundColor: 'rgba(255, 107, 53, 0.08)',
              borderColor: 'rgba(255, 107, 53, 0.25)',
              boxShadow: '0 0 20px -3px rgba(255, 107, 53, 0.3)',
            }}
          >
            <TransducerIcon size={22} color={THEME.accent} />
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

        {/* Desktop Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
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

        {/* Action CTA Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('deploy')}
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all relative overflow-hidden"
            style={{
              backgroundColor: THEME.accent,
              color: '#0E0E12',
              boxShadow: '0 0 25px -4px rgba(255, 107, 53, 0.5)',
            }}
          >
            <span>DEV KIT</span>
            <ArrowRightIcon size={13} color="#0E0E12" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-1 bg-white/[0.04] text-white"
            aria-label="Toggle Mobile Menu"
          >
            <span className={`w-4 h-0.5 bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-4 h-0.5 bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-4 h-0.5 bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[72px] left-0 w-full bg-[#0E0E12]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left font-mono text-sm py-2 px-3 rounded-lg flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-[#FF6B35]/15 text-[#FF6B35] font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {currentPage === link.id && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />}
              </button>
            ))}

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
              <span>ACTIVE CARRIER:</span>
              <span className="text-[#FF6B35] font-bold">{carrierFreq} kHz</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
