import React from 'react';

import clsx from 'clsx';

import { Seat } from './Seat';

export function SeatPaper() {
  return (
    <section
      className={clsx(
        'w-full h-full flex gap-4 p-6',
        'overflow-auto',
        'shadow-inner',
      )}
    >
      <Seat />
      <Seat />
      <Seat />
      <Seat />
      <Seat />
    </section>
  );
}
