import React, { useCallback, useMemo, useRef } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Model } from '@slavseat/types';

import { Badge, Status } from '@/shared/components/Badge';
import { Text } from '@/shared/components/Text';
import { cn } from '@/shared/utils/class.util';

import './index.css';

interface FacilityGridViewerProps
  extends GridLayout.ReactGridLayoutProps {
  facilities: Model.FacilitySummary[];
  reserves: Model.ReserveInfo[];
  selected?: number[];
  onClickFacility?: (facility: Model.FacilitySummary) => void;
  onItemRender?: (
    facility: Model.FacilitySummary,
    ref: HTMLDivElement | null,
  ) => void;
}

function FacilityGridViewer({
  facilities,
  reserves,
  selected,
  style,
  className,
  onClickFacility,
  onItemRender,
  ...rest
}: FacilityGridViewerProps) {
  const cols = 100;
  const width = 5000;

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

  const widthStyle = useMemo(() => {
    const maxHorizontal = facilities.reduce(
      (acc, { x }) => Math.max(acc, x),
      0,
    );

    return maxHorizontal * (width / cols) + (width / cols) * 2;
  }, [facilities]);

  return (
    <GridLayout
      compactType={null}
      preventCollision={true}
      layout={facilities.map(({ id, ...facility }) => ({
        ...facility,
        i: String(id),
      }))}
      cols={cols}
      rowHeight={50}
      width={width}
      margin={[0, 0]}
      containerPadding={[0, 0]}
      isResizable={false}
      isDraggable={false}
      className={cn('relative', className)}
      style={{ width: widthStyle, ...style }}
      {...rest}
    >
      {facilities.map((facility) => (
        <div
          key={facility.id}
          className="p-1 transition-none"
          onClick={() => onClickFacility?.(facility)}
        >
          <div
            ref={(ref) => onItemRender?.(facility, ref)}
            className={cn(
              'w-full h-full flex justify-center items-center p-2 bg-neutral-50 border border-neutral-200 rounded-md select-none box-border',
              { 'border-black': selected?.includes(facility.id) },
            )}
          >
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
