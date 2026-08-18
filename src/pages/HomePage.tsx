import React from 'react';
import { CoreScene } from '../components/scene/CoreScene';
import { ScrollyOverlay } from '../components/scrollytelling/ScrollyOverlay';

export const HomePage: React.FC = () => {
  return (
    <div className="scene-root relative w-full h-[700vh]">
      {/* 3D Hardware Canvas Layer */}
      <CoreScene />

      {/* Camera-Gated HTML Chapter Narrative Overlay */}
      <ScrollyOverlay />
    </div>
  );
};

export default HomePage;
