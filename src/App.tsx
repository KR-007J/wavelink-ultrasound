import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LenisProvider } from './components/providers/LenisProvider';
import { Navbar } from './components/ui/Navbar';
import { LoadingSequence } from './components/ui/LoadingSequence';
import { CursorGlow } from './components/ui/CursorGlow';
import { HomePage } from './pages/HomePage';
import { OriginPage } from './pages/OriginPage';
import { MechanicsPage } from './pages/MechanicsPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { DeployPage } from './pages/DeployPage';
import { THEME } from './lib/theme';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LenisProvider>
      <div
        className="relative min-h-screen font-sans selection:bg-[#00E5FF]/30 overflow-x-hidden"
        style={{ backgroundColor: '#0A0B0D', color: THEME.textPrimary }}
      >
        {/* Ambient Cursor Spotlight */}
        <CursorGlow />

        {/* Branded Loading Sequence */}
        <AnimatePresence>
          {loading && <LoadingSequence onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {/* 72px Fixed Navbar */}
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Page Switcher */}
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'origin' && <OriginPage />}
        {currentPage === 'mechanics' && <MechanicsPage />}
        {currentPage === 'showcase' && <ShowcasePage />}
        {currentPage === 'deploy' && <DeployPage />}
      </div>
    </LenisProvider>
  );
};

export default App;
