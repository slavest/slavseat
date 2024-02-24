import { Model } from '..';

export interface ReserveInfo {
  id: number;
  user: string;
  facility: Model.FacilityInfo;
  start: Date;
  end: Date | null;
  always: boolean;
}
