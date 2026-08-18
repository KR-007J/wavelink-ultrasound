import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { THEME } from '../../lib/theme';

export const TransducerCore: React.FC = () => {
  const meshGroup = useRef<THREE.Group>(null);
  const diaphragmRef = useRef<THREE.Mesh>(null);
  
  // Layer Refs for 3D Exploded CAD Animation
  const bodyLayerRef = useRef<THREE.Group>(null);
  const gasketLayerRef = useRef<THREE.Group>(null);
  const ceramicLayerRef = useRef<THREE.Group>(null);
  const bezelLayerRef = useRef<THREE.Group>(null);
  const goldLayerRef = useRef<THREE.Group>(null);
  const pinsLayerRef = useRef<THREE.Group>(null);

  const scrollProgress = useWavelinkStore((s) => s.scrollProgress);
  const carrierFreq = useWavelinkStore((s) => s.carrierFreq);
  const isExplodedView = useWavelinkStore((s) => s.isExplodedView);

  // Warm Brushed Titanium/Basalt Physical Material
  const titaniumMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#38343F'),
      metalness: 0.9,
      roughness: 0.22,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
    });
  }, []);

  const bezelMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#2B2733'),
      metalness: 0.94,
      roughness: 0.18,
      clearcoat: 0.8,
    });
  }, []);

  const grooveMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1F1C24'),
      metalness: 0.96,
      roughness: 0.15,
    });
  }, []);

  const diaphragmMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#17141C'),
      metalness: 0.85,
      roughness: 0.32,
      clearcoat: 0.4,
    });
  }, []);

  const gasketMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#100E14'),
      roughness: 0.9,
    });
  }, []);

  // 24K Polished Gold Piezoelectric Node
  const goldMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(THEME.secondary),
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 0.8,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!meshGroup.current) return;

    // Base Angles
    const baseRotX = isExplodedView ? 0.45 : 0.34;
    const baseRotY = isExplodedView ? -0.65 : -0.42;

    const continuousY = t * 0.08 + scrollProgress * 0.6;
    const parallaxX = (state.pointer?.x || 0) * 0.08;
    const parallaxY = -(state.pointer?.y || 0) * 0.06;

    meshGroup.current.rotation.x = THREE.MathUtils.lerp(
      meshGroup.current.rotation.x,
      baseRotX + parallaxY,
      0.08
    );
    meshGroup.current.rotation.y = THREE.MathUtils.lerp(
      meshGroup.current.rotation.y,
      baseRotY + continuousY + parallaxX,
      0.08
    );

    // Diaphragm micro-resonance
    if (diaphragmRef.current) {
      const osc = Math.sin(t * (carrierFreq * 2.5)) * 0.012;
      diaphragmRef.current.position.z = 0.12 + osc;
    }

    // Smooth Z-Axis Exploded Interpolation
    const targetBodyZ = isExplodedView ? -0.85 : 0;
    const targetGasketZ = isExplodedView ? -0.42 : 0;
    const targetCeramicZ = isExplodedView ? 0.0 : 0;
    const targetBezelZ = isExplodedView ? 0.45 : 0;
    const targetGoldZ = isExplodedView ? 0.88 : 0;
    const targetPinsZ = isExplodedView ? 1.25 : 0;

    if (bodyLayerRef.current) {
      bodyLayerRef.current.position.z = THREE.MathUtils.lerp(bodyLayerRef.current.position.z, targetBodyZ, 0.08);
    }
    if (gasketLayerRef.current) {
      gasketLayerRef.current.position.z = THREE.MathUtils.lerp(gasketLayerRef.current.position.z, targetGasketZ, 0.08);
    }
    if (ceramicLayerRef.current) {
      ceramicLayerRef.current.position.z = THREE.MathUtils.lerp(ceramicLayerRef.current.position.z, targetCeramicZ, 0.08);
    }
    if (bezelLayerRef.current) {
      bezelLayerRef.current.position.z = THREE.MathUtils.lerp(bezelLayerRef.current.position.z, targetBezelZ, 0.08);
    }
    if (goldLayerRef.current) {
      goldLayerRef.current.position.z = THREE.MathUtils.lerp(goldLayerRef.current.position.z, targetGoldZ, 0.08);
    }
    if (pinsLayerRef.current) {
      pinsLayerRef.current.position.z = THREE.MathUtils.lerp(pinsLayerRef.current.position.z, targetPinsZ, 0.08);
    }
  });

  return (
    <group ref={meshGroup} position={[2.4, 0.15, 0]} scale={[1.15, 1.15, 1.15]}>
      
      {/* LAYER 1: Titanium Body Chassis */}
      <group ref={bodyLayerRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={titaniumMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[1.9, 1.95, 0.22, 64]} />
        </mesh>
        <mesh position={[0, 0, -0.11]} rotation={[0, 0, 0]} material={bezelMaterial}>
          <torusGeometry args={[1.95, 0.038, 16, 64]} />
        </mesh>
      </group>

      {/* LAYER 2: Acoustic Decoupling Elastomer Gasket */}
      <group ref={gasketLayerRef}>
        <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]} material={gasketMaterial}>
          <cylinderGeometry args={[1.82, 1.82, 0.02, 64]} />
        </mesh>
      </group>

      {/* LAYER 3: Concentric Groove Bed & Recessed Face */}
      <group ref={ceramicLayerRef}>
        <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={bezelMaterial}>
          <cylinderGeometry args={[1.75, 1.75, 0.04, 64]} />
        </mesh>
        {[0.55, 0.9, 1.25, 1.55].map((radius, idx) => (
          <group key={idx} position={[0, 0, 0.1]}>
            <mesh material={grooveMaterial} castShadow receiveShadow>
              <torusGeometry args={[radius, 0.022, 16, 64]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* LAYER 4: Central Ceramic Diaphragm Step & Front Bezel */}
      <group ref={bezelLayerRef}>
        <mesh position={[0, 0, 0.11]} rotation={[0, 0, 0]} material={bezelMaterial} castShadow>
          <torusGeometry args={[1.92, 0.038, 16, 64]} />
        </mesh>
        <mesh
          ref={diaphragmRef}
          position={[0, 0, 0.12]}
          rotation={[Math.PI / 2, 0, 0]}
          material={diaphragmMaterial}
          castShadow
        >
          <cylinderGeometry args={[0.48, 0.48, 0.04, 48]} />
        </mesh>
      </group>

      {/* LAYER 5: Center Gold Piezoelectric Node */}
      <group ref={goldLayerRef}>
        <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.04, 32]} />
        </mesh>
      </group>

      {/* LAYER 6: Micro Piezo Solder Pins */}
      <group ref={pinsLayerRef}>
        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.72, Math.sin(angle) * 1.72, 0.11]}
            rotation={[Math.PI / 2, 0, 0]}
            material={goldMaterial}
          >
            <cylinderGeometry args={[0.025, 0.025, 0.03, 16]} />
          </mesh>
        ))}
      </group>

    </group>
  );
};

export default TransducerCore;
