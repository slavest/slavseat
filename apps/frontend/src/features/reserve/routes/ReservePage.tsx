import React, { useState } from 'react';

import { Switch } from '@/shared/components/Switch';

import { SeatPaper } from '../components/SeatPaper';

export function ReservePage() {
  const [temp, setTemp] = useState(false);

  return (
    <>
      <header className="w-full h-24 bg-white py-4 px-4">
        <h1 className="text-2xl font-bold text-black">좌석 예약</h1>
      </header>

      <section className="w-full h-full relative">
        <SeatPaper />

        <div className="absolute bottom-4 right-4">
          <Switch value={temp} onChange={setTemp} />
        </div>
      </section>
    </>
  );
}
