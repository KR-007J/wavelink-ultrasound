import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';

export const ReceiverNode: React.FC = () => {
  const nodeRef = useRef<THREE.Group>(null);
  const flashMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const receiverTick = useWavelinkStore((s) => s.receiverTick);

  const lastTick = useRef(receiverTick);
  const flashIntensity = useRef(0);

  const housingMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#221F28'),
      roughness: 0.22,
      metalness: 0.9,
      clearcoat: 0.7,
    });
  }, []);

  useFrame((state, delta) => {
    if (!nodeRef.current) return;
    const t = state.clock.elapsedTime;

    // Detect wavefront arrival
    if (receiverTick !== lastTick.current) {
      flashIntensity.current = 1.0;
      lastTick.current = receiverTick;
    }

    // Decay flash
    flashIntensity.current = Math.max(0, flashIntensity.current - delta * 2.5);

    if (flashMaterialRef.current) {
      flashMaterialRef.current.opacity = 0.2 + flashIntensity.current * 0.8;
    }

    // Subtle idle orientation
    nodeRef.current.rotation.y = Math.sin(t * 0.8) * 0.15;
    nodeRef.current.rotation.x = Math.cos(t * 0.6) * 0.1;
  });

  return (
    <group ref={nodeRef} position={[-2.8, -0.2, 0.4]} scale={[0.65, 0.65, 0.65]}>
      {/* Outer Receiver Housing */}
      <mesh material={housingMaterial}>
        <cylinderGeometry args={[0.9, 0.95, 0.25, 48]} />
      </mesh>

      {/* Receiver Acoustic Mic Port */}
      <mesh position={[0, 0, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.04, 32]} />
        <meshStandardMaterial color="#100E14" roughness={0.8} />
      </mesh>

      {/* Optical Decode Flash Ring (Solar Amber) */}
      <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.75, 48]} />
        <meshBasicMaterial
          ref={flashMaterialRef}
          color={THEME.accent}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Core Optical Point Light */}
      <pointLight color={THEME.accent} intensity={0.8} distance={2.5} position={[0, 0, 0.3]} />
    </group>
  );
};

export default ReceiverNode;
