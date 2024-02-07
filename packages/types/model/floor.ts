import { Model } from '..';

export interface FloorInfo {
  id: number;
  name: string;
  seats: Model.SeatInfo[];
}
