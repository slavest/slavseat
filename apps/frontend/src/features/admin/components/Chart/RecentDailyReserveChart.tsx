import React from 'react';

import { Model } from '@slavseat/types';
import { ParentSize } from '@visx/responsive';
import { Axis, BarSeries, Tooltip, XYChart, lightTheme } from '@visx/xychart';
import { format } from 'date-fns';

import { useReserveStatistics } from '../../hooks/reserve-statistics';

export function RecentDailyReserveChart() {
  const { data: reserveStatistics, isLoading } = useReserveStatistics();

  if (!reserveStatistics || isLoading) return null;

  return (
    <ParentSize>
      {(parent) => (
        <XYChart
          height={parent.height}
          theme={{ ...lightTheme, colors: ['#a78bfa'] }}
          width={parent.width}
          xScale={{ type: 'band', padding: 0.2 }}
          yScale={{ type: 'linear', zero: true }}
        >
          <BarSeries
            data={reserveStatistics}
            dataKey="count"
            xAccessor={(d) => format(d.date, 'yyyy-MM-dd')}
            yAccessor={(d) => +d.count}
          />
          <Axis key={'time-axis-bottom'} numTicks={reserveStatistics.length} orientation="bottom" />
          <Axis key={'value-axis-left'} numTicks={reserveStatistics.length} orientation="left" />
          <Tooltip<Model.DailyStatistics>
            renderTooltip={(data) => <span>{data.tooltipData?.nearestDatum?.datum.count}</span>}
          />
        </XYChart>
      )}
    </ParentSize>
  );
}
