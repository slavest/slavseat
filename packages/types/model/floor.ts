import { Model } from '..';

export interface FloorInfo {
  id: number;
  name: string;
  seats: Model.SeatInfo[];
  image: Model.ObjectMetaInfo | null;
}

export interface FloorSummary extends Omit<FloorInfo, 'seats' | 'image'> {}
