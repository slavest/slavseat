import React, { useCallback } from 'react';

import { CalendarDate, useCalendarContext } from '../context';
import useCalendarDate from '../hooks/useCalendarDate';
import CalendarDateCell from './CalendarDateCell';

const CalendarBody = () => {
  const { mode, selectedDate } = useCalendarContext();
  const { dates } = useCalendarDate({
    mode,
    selectedDate,
  });
  const renderDateCellContent = useCallback(
    (date: CalendarDate) => {
      if (mode === 'days') {
        return date.getDate();
      }
      return date.getDate();
    },
    [mode],
  );
  return (
    <div className={'grid grid-cols-7 gap-2'}>
      {dates.map((date, index) => (
        <CalendarDateCell key={`date-cell-${index}`} date={date}>
          {renderDateCellContent(date)}
        </CalendarDateCell>
      ))}
    </div>
  );
};
export default CalendarBody;
