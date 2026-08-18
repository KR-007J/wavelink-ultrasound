import * as THREE from 'three';

export interface CameraWaypoint {
  progress: number;
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  lightIntensity: number;
  lightPos: THREE.Vector3;
}

export const CHAPTER_WAYPOINTS: CameraWaypoint[] = [
  // 1. HERO (Wide establishing 3/4 isometric shot)
  {
    progress: 0.0,
    position: new THREE.Vector3(2.4, 0.8, 5.2),
    lookAt: new THREE.Vector3(1.2, 0.1, 0.0),
    lightIntensity: 2.2,
    lightPos: new THREE.Vector3(5, 8, 6),
  },
  // 2. EMIT (Tight macro close-up on disc face & concentric grooves)
  {
    progress: 0.16,
    position: new THREE.Vector3(1.8, 0.2, 3.2),
    lookAt: new THREE.Vector3(2.4, 0.15, 0.0),
    lightIntensity: 2.8,
    lightPos: new THREE.Vector3(4, 6, 4),
  },
  // 3. MODULATE (Angled profile view showing FSK vibration & brass pins)
  {
    progress: 0.32,
    position: new THREE.Vector3(0.8, 0.6, 4.0),
    lookAt: new THREE.Vector3(2.2, 0.15, 0.0),
    lightIntensity: 2.4,
    lightPos: new THREE.Vector3(3, 7, 5),
  },
  // 4. PROPAGATE (Pull-back wide angle showing wavefront ring pulse launching toward receiver)
  {
    progress: 0.48,
    position: new THREE.Vector3(0.0, 1.2, 6.2),
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
    lightIntensity: 1.8,
    lightPos: new THREE.Vector3(0, 9, 6),
  },
  // 5. DEMODULATE (Camera swoops and focuses directly on Receiver node disc)
  {
    progress: 0.64,
    position: new THREE.Vector3(-2.2, -0.2, 3.2),
    lookAt: new THREE.Vector3(-2.8, -0.2, 0.4),
    lightIntensity: 2.6,
    lightPos: new THREE.Vector3(-3, 6, 4),
  },
  // 6. DECODE (Dual-focus isometric overview capturing both emitter and receiver)
  {
    progress: 0.80,
    position: new THREE.Vector3(0.0, 0.4, 5.0),
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
    lightIntensity: 2.2,
    lightPos: new THREE.Vector3(2, 8, 5),
  },
  // 7. SPEC SHEET / DEPLOY (Technical top-angled inspection overview)
  {
    progress: 1.0,
    position: new THREE.Vector3(2.2, 1.0, 5.6),
    lookAt: new THREE.Vector3(1.2, 0.1, 0.0),
    lightIntensity: 2.0,
    lightPos: new THREE.Vector3(5, 8, 6),
  },
];

// Continuous Catmull-Rom Curve through the 7 Camera Positions
export const cameraSpline = new THREE.CatmullRomCurve3(
  CHAPTER_WAYPOINTS.map((w) => w.position),
  false,
  'catmullrom',
  0.5
);
