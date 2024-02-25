import React from 'react';
import GridLayout from 'react-grid-layout';

import { Model } from '@slavseat/types';

import Tag from '@/components/atoms/Tag';
import { Text } from '@/components/atoms/Text';

interface FacilityGridViewerProps {
  facilities: Model.FacilitySummary[];
  reserves: number[];
}

function FacilityGridViewer({
  facilities,
  reserves,
}: FacilityGridViewerProps) {
  return (
    <GridLayout
      compactType={null}
      preventCollision={true}
      layout={facilities.map(({ id, ...facility }) => ({
        ...facility,
        i: String(id),
      }))}
      cols={100}
      rowHeight={40}
      width={5000}
      isResizable={false}
      isDraggable={false}
    >
      {facilities.map((facility) => (
        <div
          key={facility.id}
          className="flex justify-center items-center p-2 bg-neutral-50 border border-neutral-200 rounded-md select-none box-border"
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <Text fontSize="14" fontWeight="medium">
              {facility.name}
            </Text>
            {facility.type === Model.FacilityType.SEAT && (
              <Tag
                color={
                  reserves.includes(facility.id) ? 'red' : 'green'
                }
              >
                <Text fontSize="12" className="text-white">
                  {reserves.includes(facility.id)
                    ? '사용중'
                    : '예약가능'}
                </Text>
              </Tag>
            )}
          </div>
        </div>
      ))}
    </GridLayout>
  );
}

export default FacilityGridViewer;
