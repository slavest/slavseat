import { Model } from '..';

export interface SeatInfo {
  id: number;
  x: number;
  y: number;
  label: string;
  floor: Model.FloorInfo;
}
