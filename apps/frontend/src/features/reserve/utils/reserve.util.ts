import { Model } from '@slavseat/types';

import { GroupedData } from '../types';

// TODO: 나중에 수정 | 다른 브랜치에 공통으로 쓸만하게 있었던 기억이 있음!
export function getYYYYMMDD(date: Date) {
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, '0');
  const dd = `${date.getDate()}`.padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

export function getHHMM(
  date: Date,
  formatFn: (hh: string, mm: string) => string = (hh, mm) =>
    `${hh}:${mm}`,
) {
  const hh = `${date.getHours()}`.padStart(2, '0');
  const mm = `${date.getMinutes()}`.padStart(2, '0');

  return formatFn(hh, mm);
}

export function groupDataByDate(data: Model.ReserveInfo[]) {
  const groupedData: GroupedData = {};

  data.forEach((item) => {
    const dateString = getYYYYMMDD(item.start);

    if (!groupedData[dateString]) {
      groupedData[dateString] = [];
    }

    groupedData[dateString].push(item);
  });

  return groupedData;
}

export function checkUsing(data: Model.ReserveInfo) {
  const now = new Date().getTime();
  const startTime = data.start.getTime();

  if (data.always) return startTime <= now;

  return startTime <= now && now <= data.end.getTime();
}

export function getSeatName(reserve: Model.ReserveInfo) {
  return `${reserve.facility.floor.name} - ${reserve.facility.name}`;
}
