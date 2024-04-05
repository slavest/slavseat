import { create } from 'zustand';

export type DeviceType = 'andorid' | 'ios' | 'pc';
export interface AppStore {
  isPWA: boolean;
  deviceOS: DeviceType;
  setIsPWA: (value: boolean) => void;
  setDeviceOS: (value: DeviceType) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isPWA: false,
  deviceOS: 'pc',
  setIsPWA: (value) => set({ isPWA: value }),
  setDeviceOS: (value) => set({ deviceOS: value }),
}));
