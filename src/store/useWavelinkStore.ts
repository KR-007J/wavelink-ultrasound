import { create } from 'zustand';

export interface WavelinkState {
  scrollProgress: number;
  scrollVelocity: number;
  carrierFreq: number;
  bitRate: number;
  packetSnr: number;
  decodeLatency: number;
  receiverTick: number;
  
  // 3D Exploded View State
  isExplodedView: boolean;
  activeHotspot: string | null;
  toggleExplodedView: () => void;
  setActiveHotspot: (id: string | null) => void;

  // 3D Free-Orbit Inspection Mode
  isFreeOrbit: boolean;
  toggleFreeOrbit: () => void;

  // Real-Time Packet Simulator State
  isSimulating: boolean;
  simulatedPayload: string;
  simulatedBits: string[];
  simulationProgress: number;
  decodedBytes: string[];
  crcValidated: boolean;
  startSimulation: (payload: string) => void;
  resetSimulation: () => void;

  // Setters
  setScrollProgress: (progress: number) => void;
  setScrollVelocity: (velocity: number) => void;
  setCarrierFreq: (freq: number) => void;
  triggerReceiverTick: () => void;
}

export const useWavelinkStore = create<WavelinkState>((set, get) => ({
  scrollProgress: 0,
  scrollVelocity: 0,
  carrierFreq: 20.4,
  bitRate: 16.4,
  packetSnr: 32.4,
  decodeLatency: 14,
  receiverTick: 0,

  isExplodedView: false,
  activeHotspot: null,
  toggleExplodedView: () => set((s) => ({ isExplodedView: !s.isExplodedView })),
  setActiveHotspot: (id) => set({ activeHotspot: id }),

  isFreeOrbit: false,
  toggleFreeOrbit: () => set((s) => ({ isFreeOrbit: !s.isFreeOrbit })),

  isSimulating: false,
  simulatedPayload: 'WAVELINK_AIRGAP_0x9F41',
  simulatedBits: [],
  simulationProgress: 0,
  decodedBytes: [],
  crcValidated: false,

  startSimulation: (payload: string) => {
    // Convert string to binary bits
    const bits: string[] = [];
    for (let i = 0; i < payload.length; i++) {
      const byte = payload.charCodeAt(i).toString(2).padStart(8, '0');
      for (const b of byte) bits.push(b);
    }

    set({
      isSimulating: true,
      simulatedPayload: payload,
      simulatedBits: bits,
      simulationProgress: 0,
      decodedBytes: [],
      crcValidated: false,
    });

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 0.05;
      if (currentProgress >= 1.0) {
        clearInterval(interval);
        
        // Convert to hex bytes for final decode
        const hexArray: string[] = [];
        for (let i = 0; i < payload.length; i++) {
          hexArray.push('0x' + payload.charCodeAt(i).toString(16).toUpperCase());
        }

        set({
          simulationProgress: 1.0,
          decodedBytes: hexArray,
          crcValidated: true,
          isSimulating: false,
          receiverTick: get().receiverTick + 1,
        });
      } else {
        set({ simulationProgress: currentProgress });
      }
    }, 60);
  },

  resetSimulation: () =>
    set({
      isSimulating: false,
      simulationProgress: 0,
      decodedBytes: [],
      crcValidated: false,
    }),

  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setScrollVelocity: (scrollVelocity) => set({ scrollVelocity }),
  setCarrierFreq: (carrierFreq) => set({ carrierFreq }),
  triggerReceiverTick: () => set((state) => ({ receiverTick: state.receiverTick + 1 })),
}));
