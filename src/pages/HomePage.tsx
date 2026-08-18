import React, { useState } from 'react';
import { CoreScene } from '../components/scene/CoreScene';
import { ScrollyOverlay } from '../components/scrollytelling/ScrollyOverlay';
import { StoryDeck } from '../components/scrollytelling/StoryDeck';

interface HomePageProps {
  onOpenDevKitModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDevKitModal }) => {
  const [viewMode, setViewMode] = useState<'storybook' | 'scrolly'>('storybook');

  return (
    <div className="scene-root relative w-full">
      {/* 3D CGI / VFX Spatial Background */}
      <CoreScene />

      {/* Floating Presentation Mode Toggle */}
      <div className="fixed top-20 right-4 sm:right-12 z-30 flex items-center gap-1 p-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-xs">
        <button
          onClick={() => setViewMode('storybook')}
          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
            viewMode === 'storybook'
              ? 'bg-[#FF6B35] text-[#0E0E12] font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📖 STORYBOOK DECK
        </button>
        <button
          onClick={() => setViewMode('scrolly')}
          className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
            viewMode === 'scrolly'
              ? 'bg-[#FF6B35] text-[#0E0E12] font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🎬 3D SCROLLY
        </button>
      </div>

      {/* Mode 1: Interactive Author Storybook Presentation Deck */}
      {viewMode === 'storybook' ? (
        <div className="min-h-screen">
          <StoryDeck onOpenDevKitModal={onOpenDevKitModal} />
        </div>
      ) : (
        /* Mode 2: Camera-Gated 700vh Scrollytelling */
        <div className="w-full h-[700vh]">
          <ScrollyOverlay onOpenDevKitModal={onOpenDevKitModal} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
