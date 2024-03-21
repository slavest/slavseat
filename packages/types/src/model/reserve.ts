import { Model } from '..';

interface ReserveBase {
  id: number;
  user: Model.UserInfo;
  facility: Model.FacilityInfo;
  start: Date;
}

interface Reserve extends ReserveBase {
  always: false;
  end: Date;
}

interface AlwaysReserve extends ReserveBase {
  always: true;
  end: null;
}

export type ReserveInfo = Reserve | AlwaysReserve;
