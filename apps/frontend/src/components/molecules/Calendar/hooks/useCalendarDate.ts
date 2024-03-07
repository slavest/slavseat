import { useMemo } from 'react';

const getMemorizedRule = (
  mode: string = 'days',
  selectedDate: Date = new Date(),
) => {
  if (mode === 'days') {
    return selectedDate.getMonth();
  }
  return {};
};

const getDatesFromMode = (
  mode: string,
  selectedDate: Date = new Date(),
) => {
  if (mode === 'days') {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const firstDateOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0);

    const firstDayOfMonth = firstDateOfMonth.getDay();
    const lastDayOfMonth = lastDateOfMonth.getDay();

    const firstDateOfCalendar = new Date(
      firstDateOfMonth.getTime() - 3600 * 24 * 1000 * firstDayOfMonth,
    );
    const lastDateOfCalendar = new Date(
      lastDateOfMonth.getTime() +
        3600 * 24 * 1000 * (6 - lastDayOfMonth),
    );

    const length = (
      (lastDateOfCalendar.getTime() - firstDateOfCalendar.getTime()) /
      (3600 * 24 * 1000)
    ).toFixed(0);

    return Array.from(
      { length: Number(length) + 1 },
      (_, index) =>
        new Date(
          firstDateOfCalendar.getTime() + 3600 * 24 * 1000 * index,
        ),
    );
  }
  return [];
};

const useCalendarDate = ({
  mode = 'days',
  selectedDate = new Date(),
}) => {
  // const selectedDate = new Date();
  const dates = useMemo(
    () => getDatesFromMode(mode, selectedDate),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getMemorizedRule(mode, selectedDate)],
  );
  return {
    dates,
  };
};
export default useCalendarDate;
