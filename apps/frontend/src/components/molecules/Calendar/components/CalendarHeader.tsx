import React, { useCallback } from 'react';

import { useCalendarContext } from '../context';

const CalendarHeader = () => {
  const { selectedDate, mode } = useCalendarContext();
  const renderHeaderDate = useCallback(() => {
    if (!selectedDate) return '';
    if (mode === 'days') {
      return `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }`;
    }
    if (mode === 'months') {
      return;
    }
    return '';
  }, [selectedDate, mode]);
  return (
    <>
      <div>{renderHeaderDate()}</div>
    </>
  );
};
export default CalendarHeader;
