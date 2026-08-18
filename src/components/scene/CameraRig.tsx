import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWavelinkStore } from '../../store/useWavelinkStore';
import { cameraSpline, CHAPTER_WAYPOINTS } from '../../lib/cameraPaths';

export const CameraRig: React.FC = () => {
  const { camera, size } = useThree();
  const scrollProgress = useWavelinkStore((s) => s.scrollProgress);
  const receiverTick = useWavelinkStore((s) => s.receiverTick);

  const targetPos = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(1.2, 0.1, 0));
  const targetLookAt = useRef(new THREE.Vector3());

  // Impact Shake State
  const shakeIntensity = useRef(0);
  const lastTick = useRef(receiverTick);

  useEffect(() => {
    if (receiverTick !== lastTick.current) {
      shakeIntensity.current = 0.045; // 2-3px camera impact impulse
      lastTick.current = receiverTick;
    }
  }, [receiverTick]);

  useFrame((state, delta) => {
    const clampedProgress = THREE.MathUtils.clamp(scrollProgress, 0, 0.999);
    const t = state.clock.elapsedTime;
    
    // 1. Sample spline camera position
    cameraSpline.getPointAt(clampedProgress, targetPos.current);

    // Responsive Mobile/Tablet Offset
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;
    
    let responsiveOffsetX = 0;
    let responsiveOffsetZ = 0;

    if (isMobile) {
      // Pull back camera and center slightly on mobile phones
      responsiveOffsetX = -0.9;
      responsiveOffsetZ = 1.6;
    } else if (isTablet) {
      responsiveOffsetX = -0.4;
      responsiveOffsetZ = 0.8;
    }

    // 2. Gimbal Micro-Parallax Drift
    const driftX = Math.sin(t * 0.75) * 0.035;
    const driftY = Math.sin(t * 1.5) * 0.02;

    // 3. Mouse parallax offset
    const parallaxX = (state.pointer?.x || 0) * 0.12;
    const parallaxY = -(state.pointer?.y || 0) * 0.09;

    // 4. Impact Shake Decay
    shakeIntensity.current = Math.max(0, shakeIntensity.current - delta * 0.3);
    const shakeOffsetX = (Math.random() - 0.5) * shakeIntensity.current;
    const shakeOffsetY = (Math.random() - 0.5) * shakeIntensity.current;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetPos.current.x + responsiveOffsetX + driftX + parallaxX + shakeOffsetX,
      0.06
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetPos.current.y + driftY + parallaxY + shakeOffsetY,
      0.06
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetPos.current.z + responsiveOffsetZ,
      0.06
    );

    // 5. Interpolate dynamic lookAt target between chapters
    const count = CHAPTER_WAYPOINTS.length;
    const waypointIndex = Math.min(Math.floor(clampedProgress * (count - 1)), count - 2);
    const segmentP = (clampedProgress * (count - 1)) - waypointIndex;

    const currentWp = CHAPTER_WAYPOINTS[waypointIndex];
    const nextWp = CHAPTER_WAYPOINTS[waypointIndex + 1];

    targetLookAt.current.lerpVectors(currentWp.lookAt, nextWp.lookAt, segmentP);
    if (isMobile) {
      targetLookAt.current.x -= 0.5;
    }
    currentLookAt.current.lerp(targetLookAt.current, 0.06);

    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export default CameraRig;
