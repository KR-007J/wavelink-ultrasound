import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME } from '../../lib/theme';
import { TransducerIcon, ArrowRightIcon } from '../telemetry/CustomAcousticIcons';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { TactileButton } from './TactileButton';
import { SpectrumBars } from '../telemetry/SpectrumBars';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenDevKitModal: () => void;
  onOpenSpotlight?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenDevKitModal,
  onOpenSpotlight,
}) => {
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
      className={`fixed top-0 left-0 w-full h-[72px] z-40 px-4 sm:px-8 md:px-12 flex items-center transition-all duration-300 pointer-events-auto ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#0E0E12]/92 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
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

        {/* Live Audio Spectrum Visualizer & Carrier Frequency Pill */}
        <div className="hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono">
          <SpectrumBars barsCount={8} className="h-3.5 w-12" />
          <span className="text-slate-400 text-[11px]">CARRIER:</span>
          <span className="text-[#FF6B35] font-bold text-[11px]">{carrierFreq} kHz</span>
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

        {/* Action Buttons: ⌘K Command Launcher & Dev Kit CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {onOpenSpotlight && (
            <button
              onClick={onOpenSpotlight}
              title="Open Global Command Spotlight (⌘K / Ctrl+K)"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#FF6B35]/40 text-slate-400 hover:text-white font-mono text-xs transition-all cursor-pointer shadow-sm"
            >
              <span>COMMANDS</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-[#FF6B35] font-bold">⌘K</kbd>
            </button>
          )}

          <TactileButton
            onClick={onOpenDevKitModal}
            variant="primary"
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs"
            icon={<ArrowRightIcon size={13} color="#0E0E12" />}
          >
            DEV KIT
          </TactileButton>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-1 bg-white/[0.04] text-white cursor-pointer"
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
                className={`text-left font-mono text-sm py-2 px-3 rounded-lg flex items-center justify-between cursor-pointer ${
                  currentPage === link.id
                    ? 'bg-[#FF6B35]/15 text-[#FF6B35] font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {currentPage === link.id && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />}
              </button>
            ))}

            {onOpenSpotlight && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSpotlight();
                }}
                className="w-full text-left font-mono text-xs py-2.5 px-3 rounded-lg bg-[#FF6B35]/10 border border-[#FF6B35]/25 text-[#FF6B35] flex items-center justify-between"
              >
                <span>COMMAND SPOTLIGHT</span>
                <span className="font-bold">⌘K</span>
              </button>
            )}

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
