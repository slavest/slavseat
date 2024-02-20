import React, { useCallback, useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { useControlled } from '@/hooks/useControlled';

export type SeatInfo = {
  id: number;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
};

interface SeatGridEditorProps {
  seats?: SeatInfo[];
  onChange?: (data: SeatInfo[]) => void;
}

const SeatGridEditor = ({
  seats: seatsProp,
  onChange,
}: SeatGridEditorProps) => {
  const [seats, setSeats] = useControlled([], seatsProp);
  const [seatLayout, setSeatLayout] = useControlled<
    GridLayout.Layout[]
  >([], seatsProp?.map((seat) => ({ ...seat, i: String(seat.id) })));
  const [names, setNames] = useControlled<Record<string, string>>(
    {},
    seatsProp?.reduce(
      (prev, curr) => ({ ...prev, [curr.id]: curr.name }),
      {},
    ),
  );

  const handleChangeGrid = useCallback(
    (layout: GridLayout.Layout[]) => {
      const data: SeatInfo[] = layout.map((item) => ({
        ...item,
        name: names[item.i],
        id: Number(item.i),
      }));

      setSeatLayout(layout);
      setSeats(data);
      onChange?.(data);
    },
    [names, onChange, setSeatLayout, setSeats],
  );

  const handleChangeName = useCallback(
    (id: number, name: string) => {
      const data: SeatInfo[] = seats.map((seat) => {
        if (seat.id === id) {
          return {
            ...seat,
            name,
          };
        }

        return seat;
      });

      setSeats(data);
      setNames((prev) => ({ ...prev, [id]: name }));
      onChange?.(data);
    },
    [onChange, seats, setNames, setSeats],
  );

  return (
    <GridLayout
      compactType={null}
      preventCollision={true}
      layout={seatLayout}
      onLayoutChange={handleChangeGrid}
      cols={100}
      rowHeight={40}
      width={5000}
    >
      {seats.map((seat) => (
        <div
          key={seat.id}
          className="flex justify-center items-center bg-neutral-50 border border-neutral-200 rounded-md select-none p-2 box-border"
        >
          <input
            className="w-full border border-neutral-200 rounded text-sm"
            value={seat.name}
            onChange={(e) =>
              handleChangeName(seat.id, e.target.value)
            }
          />
        </div>
      ))}
    </GridLayout>
  );
};

export default SeatGridEditor;
