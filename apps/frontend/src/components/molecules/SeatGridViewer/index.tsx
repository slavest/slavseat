import React from 'react';
import GridLayout from 'react-grid-layout';

import Tag from '@/components/atoms/Tag';
import { Text } from '@/components/atoms/Text';

import { SeatInfo } from '../SeatGridEditor';

interface SeatGridViewerProps {
  seats: SeatInfo[];
  reserves: number[];
}

const SeatGridViewer = ({ seats, reserves }: SeatGridViewerProps) => {
  return (
    <GridLayout
      compactType={null}
      preventCollision={true}
      layout={seats.map((seat) => ({ ...seat, i: String(seat.id) }))}
      cols={100}
      rowHeight={40}
      width={5000}
      isResizable={false}
      isDraggable={false}
    >
      {seats.map((seat) => (
        <div
          key={seat.id}
          className="flex flex-col justify-center items-center gap-3 bg-neutral-50 border border-neutral-200 rounded-md select-none p-2 box-border"
        >
          <Text fontSize="14" fontWeight="medium">
            {seat.name}
          </Text>
          <Tag color={reserves.includes(seat.id) ? 'red' : 'green'}>
            <Text fontSize="12" className="text-white">
              {reserves.includes(seat.id) ? '사용중' : '예약가능'}
            </Text>
          </Tag>
        </div>
      ))}
    </GridLayout>
  );
};

export default SeatGridViewer;
