export const getWeek = (date: Date): number => {
  // 해당 연도의 첫 번째 날짜를 구합니다.
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);

  // 첫 번째 날짜가 몇 번째 요일인지 확인합니다. (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const firstDayOfWeek = firstDayOfYear.getDay();

  // 현재 날짜가 몇 일째인지 계산합니다.
  const dayOfYear =
    Math.floor((date.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;

  // 현재 날짜가 몇 번째 주인지 계산합니다.
  let weekNumber = Math.ceil((dayOfYear + firstDayOfWeek) / 7);

  // 첫 번째 주가 되는 경우, 연도의 마지막 주로 설정합니다.
  if (firstDayOfWeek === 0) {
    if (weekNumber === 0) {
      weekNumber = 52;
    }
  }

  return weekNumber;
};

export const getStartOfWeek = (week: number) => {
  const onejan = new Date(new Date().getFullYear(), 0, 1);
  return new Date(onejan.getTime() + 86400000 * 7 * (week - 1));
};
