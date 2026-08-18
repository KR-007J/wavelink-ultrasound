import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';

export const WavePulse: React.FC = () => {
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const scrollVelocity = useWavelinkStore((s) => s.scrollVelocity);
  const triggerReceiverTick = useWavelinkStore((s) => s.triggerReceiverTick);

  const ringCount = 4;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const absVelocity = Math.min(Math.abs(scrollVelocity), 12);
    const speed = (carrierFreq / 20.4) * 1.5 + absVelocity * 0.2;

    ringsRef.current.forEach((ring, idx) => {
      if (!ring) return;
      const offset = idx / ringCount;
      const phase = (t * speed * 0.3 + offset) % 1.0;

      // Expand radius and translate along Z-axis in 3D space
      const scale = 0.9 + phase * 3.6;
      const zPos = 0.15 + phase * 2.8;

      ring.scale.set(scale, scale, 1);
      ring.position.z = zPos;

      const material = ring.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, (1.0 - phase) * 0.45);

      if (phase > 0.76 && phase < 0.79) {
        triggerReceiverTick();
      }
    });
  });

  return (
    <group position={[2.4, 0.15, 0]}>
      {Array.from({ length: ringCount }).map((_, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            if (el) ringsRef.current[idx] = el;
          }}
          position={[0, 0, 0.15]}
        >
          <torusGeometry args={[0.85, 0.018, 16, 64]} />
          <meshBasicMaterial
            color={THEME.accent}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

export default WavePulse;
