import { Model } from '@slavseat/types';

import { GroupedData } from '../types';

// TODO: 나중에 수정 | 다른 브랜치에 공통으로 쓸만하게 있었던 기억이 있음!
export function getYYYYMMDD(date: Date) {
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, '0');
  const dd = `${date.getDate()}`.padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

export function groupDataByDate(data: Model.ReserveInfo[]) {
  const beforeTodayData: GroupedData = {};
  const todayData: Model.ReserveInfo[] = [];
  const afterTodayData: GroupedData = {};

  const today = new Date();
  const todayString = getYYYYMMDD(today);

  data.sort(sortReserveByDate).forEach((item) => {
    let groupedData: GroupedData;

    const dateString = getYYYYMMDD(item.start);

    if (todayString === dateString) {
      todayData.push(item);
    } else {
      if (item.start > today) {
        groupedData = afterTodayData;
      } else {
        groupedData = beforeTodayData;
      }

      if (!groupedData[dateString]) {
        groupedData[dateString] = [];
      }

      groupedData[dateString].push(item);
    }
  });

  return { beforeTodayData, todayData, afterTodayData };
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

export function sortReserveByDate(a: Model.ReserveInfo, b: Model.ReserveInfo) {
  if (a.always) return -1;
  return new Date(b.start).getTime() - new Date(a.start).getTime();
}
