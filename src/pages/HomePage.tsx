import React from 'react';
import { PhotorealisticHeroScene } from '../components/scene/PhotorealisticHeroScene';
import { CoreScene } from '../components/scene/CoreScene';
import { ScrollyOverlay } from '../components/scrollytelling/ScrollyOverlay';
import { useWavelinkStore } from '../store/useWavelinkStore';

interface HomePageProps {
  onOpenDevKitModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDevKitModal }) => {
  const isExplodedView = useWavelinkStore((s) => s.isExplodedView);
  const isFreeOrbit = useWavelinkStore((s) => s.isFreeOrbit);

  return (
    <div className="scene-root relative w-full h-[700vh]">
      {/* 1. Photorealistic 8K Multi-Frame Cinematic Movie Canvas */}
      <PhotorealisticHeroScene />

      {/* 2. Interactive 3D Three.js Spatial Layer (Activates on 3D Orbit / CAD Explode) */}
      {(isExplodedView || isFreeOrbit) && (
        <div className="fixed inset-0 z-0 pointer-events-auto">
          <CoreScene />
        </div>
      )}

      {/* 3. Camera-Gated HTML Chapter Narrative Overlay */}
      <ScrollyOverlay onOpenDevKitModal={onOpenDevKitModal} />
    </div>
  );
};

export default HomePage;
