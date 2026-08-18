import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { TransducerCore } from './TransducerCore';
import { WavePulse } from './WavePulse';
import { ReceiverNode } from './ReceiverNode';
import { CameraRig } from './CameraRig';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { CHAPTER_WAYPOINTS } from '../../lib/cameraPaths';
import { THEME } from '../../lib/theme';

const DynamicLightingRig: React.FC = () => {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const scrollProgress = useWavelinkStore((s) => s.scrollProgress);

  useFrame(() => {
    if (!keyLightRef.current) return;
    const clampedProgress = THREE.MathUtils.clamp(scrollProgress, 0, 0.999);
    const count = CHAPTER_WAYPOINTS.length;
    const waypointIndex = Math.min(Math.floor(clampedProgress * (count - 1)), count - 2);
    const segmentP = (clampedProgress * (count - 1)) - waypointIndex;

    const currentWp = CHAPTER_WAYPOINTS[waypointIndex];
    const nextWp = CHAPTER_WAYPOINTS[waypointIndex + 1];

    const targetIntensity = THREE.MathUtils.lerp(currentWp.lightIntensity, nextWp.lightIntensity, segmentP);
    keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, targetIntensity * 1.25, 0.08);

    keyLightRef.current.position.lerp(
      new THREE.Vector3().lerpVectors(currentWp.lightPos, nextWp.lightPos, segmentP),
      0.08
    );
  });

  return (
    <>
      {/* 1. Dynamic Directional Key Light (Warm Alabaster #FFF5EB) */}
      <directionalLight
        ref={keyLightRef}
        position={[5, 8, 6]}
        intensity={2.8}
        color="#FFF5EB"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      
      {/* 2. Secondary Studio Top Light for Crisp Specular Highlights */}
      <directionalLight
        position={[0, 10, 2]}
        intensity={1.2}
        color="#FFF8F0"
      />

      {/* 3. Soft Warm Fill Light */}
      <directionalLight
        position={[-5, 3, 4]}
        intensity={0.8}
        color="#D4D0DC"
      />

      {/* 4. Solar Radiant Amber Rim Light (Warm Grazing Silhouette) */}
      <pointLight
        position={[-4, -3, -4]}
        color={THEME.accent}
        intensity={3.5}
        distance={16}
      />
      <pointLight
        position={[4, -2, -3]}
        color={THEME.secondary}
        intensity={2.0}
        distance={12}
      />

      {/* 5. Base Warm Mineral Ambient Hemisphere */}
      <hemisphereLight
        args={['#FFF5EB', '#1A1622', 0.6]}
      />
    </>
  );
};

export const CoreScene: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: THEME.bg,
      }}
    >
      <Canvas
        shadows
        camera={{ position: [2.4, 0.8, 5.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: false }}
      >
        {/* Soft Warm Viewport Fog */}
        <fog attach="fog" args={[THEME.bg, 6, 24]} />

        <DynamicLightingRig />
        <CameraRig />

        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            {/* The 3D Transducer Core Hardware */}
            <TransducerCore />

            {/* 3D Wavefront Torus Ring Emitter (Solar Amber) */}
            <WavePulse />

            {/* Acoustic Receiver Node */}
            <ReceiverNode />
            
            {/* Ambient Ground Contact Shadow */}
            <ContactShadows
              position={[0, -1.4, 0]}
              opacity={0.65}
              scale={12}
              blur={2.0}
              far={5}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CoreScene;
