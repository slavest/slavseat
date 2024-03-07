import React from 'react';

import { useCalendarContext } from '../context';

const CalendarNav = () => {
  const { handleClickNav } = useCalendarContext();
  return (
    <div className="flex justify-between">
      <div onClick={() => handleClickNav?.(-1)}>prev</div>
      <div onClick={() => handleClickNav?.(1)}>next</div>
    </div>
  );
};
export default CalendarNav;
