import { Model } from '@slavseat/types';

export function checkUsing(data: Model.ReserveInfo) {
  const now = new Date().getTime();
  const startTime = data.start.getTime();

  if (data.always) return startTime <= now;

  return startTime <= now && now <= data.end.getTime();
}

export function getSeatName(reserve: Model.ReserveInfo) {
  return `${reserve.facility.floor.name} - ${reserve.facility.name}`;
}

export function sortReserveByDate(
  a: Model.ReserveInfo,
  b: Model.ReserveInfo,
) {
  if (a.always) return -1;
  return new Date(b.start).getTime() - new Date(a.start).getTime();
}
