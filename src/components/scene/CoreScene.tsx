import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { TransducerCore } from './TransducerCore';
import { WavePulse } from './WavePulse';
import { ReceiverNode } from './ReceiverNode';
import { AcousticHarmonics } from './AcousticHarmonics';
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
        color="#F5ECE0"
      />

      {/* 4. Warm Solar Amber Grazing Rim Light */}
      <pointLight
        position={[-3.5, -2, -3]}
        intensity={2.2}
        color={THEME.accent}
        distance={10}
      />

      {/* 5. Champagne Gold Secondary Edge Light */}
      <pointLight
        position={[3.5, -1, 3]}
        intensity={1.5}
        color={THEME.secondary}
        distance={8}
      />

      {/* 6. Mineral Basalt Ambient Hemisphere Light */}
      <hemisphereLight
        args={['#FFF5EB', '#1A1622', 0.6]}
      />
    </>
  );
};

export const CoreScene: React.FC = () => {
  const isFreeOrbit = useWavelinkStore((s) => s.isFreeOrbit);

  return (
    <div
      className={`fixed inset-0 w-full h-full z-0 overflow-hidden ${
        isFreeOrbit ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
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

        {isFreeOrbit && (
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={2.5}
            maxDistance={12}
            target={[1.2, 0.1, 0]}
          />
        )}

        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            {/* The 3D Transducer Core Hardware */}
            <TransducerCore />

            {/* 3D Wavefront Torus Ring Emitter (Solar Amber) */}
            <WavePulse />

            {/* Organic Acoustic Harmonic Streamlines */}
            <AcousticHarmonics />

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
