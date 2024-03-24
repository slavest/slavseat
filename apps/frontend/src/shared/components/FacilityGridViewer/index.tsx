import React, { useCallback } from 'react';
import GridLayout from 'react-grid-layout';

import { Model } from '@slavseat/types';

import { Badge, Status } from '@/shared/components/Badge';
import { Text } from '@/shared/components/Text';
import { cn } from '@/shared/utils/class.util';

interface FacilityGridViewerProps {
  facilities: Model.FacilitySummary[];
  reserves: Model.ReserveInfo[];
  onClickFacility?: (facility: Model.FacilitySummary) => void;
}

function FacilityGridViewer({
  facilities,
  reserves,
  onClickFacility,
}: FacilityGridViewerProps) {
  const getReserveStatus = useCallback(
    (facility: Model.FacilitySummary) => {
      const filteredReserves = reserves.filter(
        (r) => r.facility.id === facility.id,
      );

      const now = new Date();
      const isUsing = filteredReserves.some(
        (r) =>
          new Date(r.start) <= now &&
          (r.always || !r.end || now <= new Date(r.end)),
      );
      if (isUsing) return Status.USING;

      const isReserved = filteredReserves.some(
        (r) => new Date(r.start) >= now,
      );
      if (isReserved) return Status.RESERVED;

      return Status.ABLE_RESERVE;
    },
    [reserves],
  );

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
      // style={{ width: '5000px' }}
      margin={[0, 0]}
      containerPadding={[25, 25]}
      isResizable={false}
      isDraggable={false}
    >
      {facilities.map((facility) => (
        <div
          key={facility.id}
          className="p-1"
          onClick={() => onClickFacility?.(facility)}
        >
          <div className="w-full h-full flex justify-center items-center p-2 bg-neutral-50 border border-neutral-200 rounded-md select-none box-border">
            <div className="flex flex-col gap-2 justify-center items-center">
              <Text className="text-sm font-medium">
                {facility.name}
              </Text>
              {facility.type === Model.FacilityType.SEAT && (
                <Badge status={getReserveStatus(facility)} />
              )}
            </div>
          </div>
        </div>
      ))}
    </GridLayout>
  );
}

export default FacilityGridViewer;
