import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LenisProvider } from './components/providers/LenisProvider';
import { Navbar } from './components/ui/Navbar';
import { LoadingSequence } from './components/ui/LoadingSequence';
import { CursorGlow } from './components/ui/CursorGlow';
import { DevKitModal } from './components/ui/DevKitModal';
import { CommandSpotlight } from './components/ui/CommandSpotlight';
import { HomePage } from './pages/HomePage';
import { OriginPage } from './pages/OriginPage';
import { MechanicsPage } from './pages/MechanicsPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { DeployPage } from './pages/DeployPage';
import { useWavelinkStore } from './store/useWavelinkStore';
import { THEME } from './lib/theme';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isDevKitModalOpen, setIsDevKitModalOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const setScrollProgress = useWavelinkStore((s) => s.setScrollProgress);

  // Global ⌘K / Ctrl+K keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSpotlightOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSpotlightOpen(false);
        setIsDevKitModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (page !== 'home') {
      setScrollProgress(0);
    }
  };

  const handleOpenDevKitModal = () => {
    setIsDevKitModalOpen(true);
  };

  const handleCloseDevKitModal = () => {
    setIsDevKitModalOpen(false);
  };

  const handleOpenSpotlight = () => {
    setIsSpotlightOpen(true);
  };

  const handleCloseSpotlight = () => {
    setIsSpotlightOpen(false);
  };

  return (
    <LenisProvider currentPage={currentPage}>
      <div
        className="relative min-h-screen font-sans selection:bg-[#FF6B35]/30 overflow-x-hidden"
        style={{ backgroundColor: THEME.bg, color: THEME.textPrimary }}
      >
        {/* Ambient Cursor Spotlight */}
        <CursorGlow />

        {/* Branded Loading Sequence */}
        <AnimatePresence>
          {loading && <LoadingSequence onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {/* 72px Fixed Navbar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenDevKitModal={handleOpenDevKitModal}
          onOpenSpotlight={handleOpenSpotlight}
        />

        {/* Global Command Spotlight (⌘K) */}
        <CommandSpotlight
          isOpen={isSpotlightOpen}
          onClose={handleCloseSpotlight}
          onNavigate={handleNavigate}
          onOpenDevKitModal={handleOpenDevKitModal}
        />

        {/* Interactive Dev Kit Modal */}
        <DevKitModal
          isOpen={isDevKitModalOpen}
          onClose={handleCloseDevKitModal}
        />

        {/* Clean, Unconstrained Page Views */}
        {currentPage === 'home' && (
          <HomePage onOpenDevKitModal={handleOpenDevKitModal} />
        )}
        {currentPage === 'origin' && (
          <OriginPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'mechanics' && <MechanicsPage />}
        {currentPage === 'showcase' && (
          <ShowcasePage onNavigate={handleNavigate} />
        )}
        {currentPage === 'deploy' && (
          <DeployPage onOpenDevKitModal={handleOpenDevKitModal} />
        )}
      </div>
    </LenisProvider>
  );
};

export default App;
