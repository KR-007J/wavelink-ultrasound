import { create } from 'zustand';

interface WavelinkStoreState {
  carrierFreq: number;
  scrollProgress: number;
  scrollVelocity: number;
  bitRate: number;
  packetSnr: number;
  decodeLatency: number;
  isTransmitting: boolean;
  receiverTick: number;
  setCarrierFreq: (freq: number) => void;
  setScrollProgress: (progress: number) => void;
  setScrollVelocity: (velocity: number) => void;
  triggerReceiverTick: () => void;
}

export const useWavelinkStore = create<WavelinkStoreState>((set) => ({
  carrierFreq: 20.4,
  scrollProgress: 0,
  scrollVelocity: 0,
  bitRate: 16.4,
  packetSnr: 32.4,
  decodeLatency: 14,
  isTransmitting: true,
  receiverTick: 0,
  setCarrierFreq: (freq) => set({ carrierFreq: Math.round(freq * 10) / 10 }),
  setScrollProgress: (progress) => set({ scrollProgress: Math.min(Math.max(progress, 0), 1) }),
  setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),
  triggerReceiverTick: () => set((state) => ({ receiverTick: state.receiverTick + 1 })),
}));
