import { Model } from '..';

export const FacilityType = {
  NONE: 0,
  SEAT: 1,
  MEETING_ROOM: 2,
} as const;
export type FacilityType =
  (typeof FacilityType)[keyof typeof FacilityType];

export interface FacilityInfo {
  id: number;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: FacilityType;
  floor: Model.FloorInfo;
}

export interface FacilitySummary
  extends Omit<FacilityInfo, 'floor'> {}
