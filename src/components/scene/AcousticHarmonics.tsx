import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';

export const AcousticHarmonics: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const scrollVelocity = useWavelinkStore((s) => s.scrollVelocity);
  const isSimulating = useWavelinkStore((s) => s.isSimulating);

  const count = 160;

  const [positions, initialOffsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const offsets = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spawn in acoustic path between [2.4, 0.15, 0] and [-2.8, -0.2, 0.4]
      const t = i / count;
      const x = THREE.MathUtils.lerp(2.4, -2.8, t) + (Math.random() - 0.5) * 1.8;
      const y = (Math.random() - 0.5) * 2.2;
      const z = (Math.random() - 0.5) * 2.0;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      offsets[i * 3] = Math.random() * Math.PI * 2;
      offsets[i * 3 + 1] = Math.random() * Math.PI * 2;
      offsets[i * 3 + 2] = Math.random() * 0.5 + 0.5;
    }

    return [pos, offsets];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    const velocityBoost = Math.min(Math.abs(scrollVelocity), 8) * 0.02;
    const simBoost = isSimulating ? 1.8 : 1.0;
    const speed = (carrierFreq / 20.4) * 0.8 * simBoost + velocityBoost;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const initialPhase = initialOffsets[idx];

      // Gentle acoustic streamline flow toward receiver
      array[idx] -= (0.015 * speed);
      if (array[idx] < -3.5) {
        array[idx] = 3.0 + (Math.random() - 0.5) * 0.8;
      }

      // Harmonic sine dispersion
      array[idx + 1] += Math.sin(t * 1.5 + initialPhase) * 0.003;
      array[idx + 2] += Math.cos(t * 1.2 + initialPhase) * 0.002;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={THEME.accent}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default AcousticHarmonics;
