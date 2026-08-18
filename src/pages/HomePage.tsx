import React from 'react';
import { CoreScene } from '../components/scene/CoreScene';
import { ScrollyOverlay } from '../components/scrollytelling/ScrollyOverlay';

interface HomePageProps {
  onOpenDevKitModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDevKitModal }) => {
  return (
    <div className="scene-root relative w-full h-[700vh]">
      {/* 1. Real-Time 3D Three.js Spatial CGI / VFX Canvas */}
      <CoreScene />

      {/* 2. Interactive Camera-Gated Scrollytelling Slide Animation Layer */}
      <ScrollyOverlay onOpenDevKitModal={onOpenDevKitModal} />
    </div>
  );
};

export default HomePage;
