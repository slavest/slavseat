import React, { useCallback, useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Model } from '@slavseat/types';

import { Badge, Status } from '@/shared/components/Badge';
import { Text } from '@/shared/components/Text';
import { cn } from '@/shared/utils/class.util';

import './index.css';

interface FacilityGridViewerProps extends GridLayout.ReactGridLayoutProps {
  facilities: Model.FacilitySummary[];
  reserves: Model.ReserveInfo[];
  selected?: number[];
  onClickFacility?: (facility: Model.FacilitySummary) => void;
  onItemRender?: (facility: Model.FacilitySummary, ref: HTMLDivElement | null) => void;
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

  const getReserveInfo = useCallback(
    (facility: Model.FacilitySummary): { username: string | null; status: Status } => {
      const filteredReserves = reserves.filter((r) => r.facility.id === facility.id);

      const now = new Date();
      const usingReserve = filteredReserves.find(
        (r) => new Date(r.start) <= now && (r.always || !r.end || now <= new Date(r.end)),
      );
      if (usingReserve)
        return {
          username: usingReserve.user.name,
          status: usingReserve.always ? Status.ALWAYS : Status.USING,
        };

      const waitReserve = filteredReserves.find((r) => new Date(r.start) >= now);
      if (waitReserve)
        return {
          username: waitReserve.user.name,
          status: waitReserve.always ? Status.ALWAYS : Status.RESERVED,
        };

      return { username: null, status: Status.ABLE_RESERVE };
    },
    [reserves],
  );

  const renderBadge = useCallback(
    (facility: Model.FacilitySummary) => {
      const { username, status } = getReserveInfo(facility);

      if (status === Status.ABLE_RESERVE) return <Badge status={status} />;

      // TODO: 일단 로직 하드코딩
      return <Badge status={status}>{username?.split('/').at(0)?.trim()}</Badge>;
    },
    [getReserveInfo],
  );

  const widthStyle = useMemo(() => {
    const maxHorizontal = facilities.reduce((acc, { x }) => Math.max(acc, x), 0);

    return maxHorizontal * (width / cols) + (width / cols) * 2;
  }, [facilities]);

  return (
    <GridLayout
      className={cn('relative', className)}
      cols={cols}
      compactType={null}
      containerPadding={[0, 0]}
      isDraggable={false}
      isResizable={false}
      layout={facilities.map(({ id, ...facility }) => ({
        ...facility,
        i: String(id),
      }))}
      margin={[0, 0]}
      preventCollision={true}
      rowHeight={50}
      style={{ width: widthStyle, ...style }}
      width={width}
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
              'box-border flex h-full w-full select-none items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 p-2',
              { 'border-black': selected?.includes(facility.id) },
            )}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <Text className="text-sm font-medium">{facility.name}</Text>

              {facility.type === Model.FacilityType.SEAT && renderBadge(facility)}
            </div>
          </div>
        </div>
      ))}
    </GridLayout>
  );
}

export default FacilityGridViewer;
