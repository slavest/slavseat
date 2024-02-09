import { Model } from '..';

export interface SeatInfo {
  id: number;
  x: number;
  y: number;
  label: string;
  floor: Model.FloorInfo;
}

export interface SeatSummary extends Omit<SeatInfo, 'floor'> {}
