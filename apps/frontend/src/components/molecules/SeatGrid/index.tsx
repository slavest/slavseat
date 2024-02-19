import React, { useCallback, useState } from 'react';
import GridLayout, { ReactGridLayoutProps } from 'react-grid-layout';

import { Text } from '@/components/atoms/Text';

type SeatInfo = {
  id: number;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

interface SeatGridProps extends ReactGridLayout.ReactGridLayoutProps {
  seats: SeatInfo[];
  editable?: boolean;
}

const SeatGrid = ({
  seats,
  editable = false,
  ...rest
}: SeatGridProps) => {
  const [names, setNames] = useState<Record<number, string>>(
    seats.reduce((prev, cur) => {
      return {
        ...prev,
        [cur.id]: cur.name,
      };
    }),
  );

  const handleChangeGrid = useCallback(
    (layout: GridLayout.Layout[]) => {},
    [],
  );

  const handleChangeName = useCallback(
    (id: number, name: string) => {},
    [],
  );

  return (
    <GridLayout
      className="bg-zinc-900"
      compactType={null}
      preventCollision={true}
      layout={seats.map(({ id, ...seat }) => ({
        ...seat,
        i: String(id),
      }))}
      onLayoutChange={handleChangeGrid}
      cols={100}
      rowHeight={40}
      width={5000}
      {...rest}
    >
      {seats.map((seat) => (
        <div key={seat.id} className="bg-neutral-50 select-none">
          <Text fontSize="12">{seat.id}</Text>
          <input
            onChange={(e) =>
              handleChangeName(seat.id, e.target.value)
            }
          />
        </div>
      ))}
    </GridLayout>
  );
};

export default SeatGrid;
