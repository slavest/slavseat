import { Model } from '..';

export interface ReserveInfoBase {
  id: number;
  user: Model.UserInfo;
  facility: Model.FacilityInfo;
  start: Date;
  end: Date | null;
  always: boolean;
}

export interface Reserve extends ReserveInfoBase {
  always: false;
  end: Date;
}

export interface AlwaysReserve extends ReserveInfoBase {
  always: true;
  end: null;
}

export type ReserveInfo = Reserve | AlwaysReserve;
