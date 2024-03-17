import { Model } from '..';

export interface ReserveInfo {
  id: number;
  user: Model.UserInfo;
  facility: Model.FacilityInfo;
  start: Date;
  end: Date | null;
  always: boolean;
}
