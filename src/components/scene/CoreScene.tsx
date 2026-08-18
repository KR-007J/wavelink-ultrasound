import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
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
    keyLightRef.current.intensity = THREE.MathUtils.lerp(keyLightRef.current.intensity, targetIntensity * 1.15, 0.08);

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
        intensity={2.5}
        color="#FFF5EB"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      
      {/* 2. Soft Warm Fill Light */}
      <directionalLight
        position={[-4, 3, 3]}
        intensity={0.6}
        color="#A3A1AC"
      />

      {/* 3. Solar Radiant Amber Rim Light (Warm Grazing Silhouette) */}
      <pointLight
        position={[-4, -3, -4]}
        color={THEME.accent}
        intensity={3.0}
        distance={14}
      />
      <pointLight
        position={[4, -2, -3]}
        color={THEME.secondary}
        intensity={1.5}
        distance={10}
      />

      {/* Base Warm Mineral Ambient */}
      <ambientLight intensity={0.35} color="#1A1622" />
    </>
  );
};

export const CoreScene: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none"
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
        gl={{ powerPreference: 'high-performance', antialias: true }}
      >
        {/* Soft Warm Viewport Fog */}
        <fog attach="fog" args={[THEME.bg, 6, 24]} />

        <DynamicLightingRig />
        <Environment preset="studio" />
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
