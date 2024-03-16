import React from 'react';
import GridLayout from 'react-grid-layout';

import { Model } from '@slavseat/types';
import clsx from 'clsx';

import { Badge, Status } from '@/components/atoms/Badge';
import { Text } from '@/components/atoms/Text';
import { hideScrollBar } from '@/global-style.css';

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
      rowHeight={50}
      width={5000}
      margin={[0, 0]}
      isResizable={false}
      isDraggable={false}
    >
      {facilities.map((facility) => (
        <div key={facility.id} className="p-1">
          <div className="w-full h-full flex justify-center items-center p-2 bg-neutral-50 border border-neutral-200 rounded-md select-none box-border">
            <div className="flex flex-col gap-2 justify-center items-center">
              <Text fontSize="14" fontWeight="medium">
                {facility.name}
              </Text>
              {facility.type === Model.FacilityType.SEAT && (
                <Badge
                  status={
                    reserves.includes(facility.id)
                      ? Status.USING
                      : Status.ABLE_RESERVE
                  }
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </GridLayout>
  );
}

export default FacilityGridViewer;
