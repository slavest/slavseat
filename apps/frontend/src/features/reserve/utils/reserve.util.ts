import { ReserveInfo } from '@slavseat/types/src/model';

import { GroupedData } from '../types';

// TODO: 나중에 수정 | 다른 브랜치에 공통으로 쓸만하게 있었던 기억이 있음!
export function getHHMM(date: Date | string) {
  if (typeof date === 'string') {
    return date.split('T')[1].slice(0, 5);
  }

  return `${date.getHours()}:${date.getMinutes()}`;
}

export function groupDataByDate(data: ReserveInfo[]) {
  // 빈 객체를 생성하여 날짜별로 데이터를 그룹화
  const groupedData: GroupedData = {};

  // 데이터를 반복하며 그룹화
  data.forEach((item) => {
    // 각 아이템의 시작 날짜를 가져옴
    const startDate = new Date(item.start);
    // 날짜의 문자열 표현을 yyyy-mm-dd 형식으로 가져옴
    const dateString = startDate.toISOString().split('T')[0];

    // 만약 그룹화된 데이터 객체에 해당 날짜의 키가 없다면 추가
    if (!groupedData[dateString]) {
      groupedData[dateString] = [];
    }

    // 해당 날짜의 그룹에 아이템 추가
    groupedData[dateString].push(item);
  });

  return groupedData;
}

export function checkNowUse(data?: ReserveInfo[]) {
  if (!data || data.length < 1) return false;

  const groupData = groupDataByDate(data);

  const todayReserve =
    groupData[new Date().toISOString().split('T')[0]];

  if (!todayReserve) return false;

  const usingReserve = todayReserve.find(
    (reserve) =>
      new Date(reserve.start).getDate() === new Date().getDate(),
  );

  if (!usingReserve) return false;

  return usingReserve;
}
