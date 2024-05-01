import { Model } from '..';

export interface FloorInfo {
  id: number;
  name: string;
  facilities: Model.FacilityInfo[];
  image: Model.ObjectMetaInfo | null;
  order: number;
  disabled: boolean;
}

export interface FloorSummary extends Omit<FloorInfo, 'facilities' | 'image'> {}
