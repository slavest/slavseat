import { Model } from "..";

export interface ReserveInfo {
  id: number;
  user: string;
  seat: Model.SeatInfo;
  start: Date;
  end: Date | null;
  always: boolean;
}
