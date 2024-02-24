import { Model } from '..';

export interface FloorInfo {
  id: number;
  name: string;
  facilities: Model.FacilityInfo[];
  image: Model.ObjectMetaInfo | null;
}

export interface FloorSummary extends Omit<FloorInfo, 'image'> {}
