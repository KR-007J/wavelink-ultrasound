import React from 'react';
import { PhotorealisticHeroScene } from '../components/scene/PhotorealisticHeroScene';
import { ScrollyOverlay } from '../components/scrollytelling/ScrollyOverlay';

interface HomePageProps {
  onOpenDevKitModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDevKitModal }) => {
  return (
    <div className="scene-root relative w-full h-[700vh]">
      {/* Photorealistic 8K Cinematic Hardware Canvas Layer */}
      <PhotorealisticHeroScene />

      {/* Camera-Gated HTML Chapter Narrative Overlay */}
      <ScrollyOverlay onOpenDevKitModal={onOpenDevKitModal} />
    </div>
  );
};

export default HomePage;
