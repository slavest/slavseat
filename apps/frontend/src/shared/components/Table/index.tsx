import React from 'react';

import * as rt from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

import { cn } from '@/shared/utils/class.util';

type FlattenKeys<T> = T extends object | Array<never>
  ? T extends Array<never>
    ? never
    : {
        [K in keyof T]-?: K extends string
          ? K | `${K}.${FlattenKeys<T[K]>}`
          : never;
      }[keyof T]
  : never;

export interface ColumnType<T extends object>
  extends rt.ColumnProps<T> {
  dataKey: FlattenKeys<T> | (string & NonNullable<unknown>);
  headerContent: React.ReactNode;
  renderContent?: (data: T) => React.ReactNode;
}

export interface TableProps
  extends Omit<rt.TableProps<object, never>, 'data'> {
  columns: ColumnType<never>[];
  data?: any[];
}

export function Table({
  data,
  columns,
  className,
  rowHeight = 36,
  ...rest
}: TableProps) {
  return (
    <rt.Table
      data={data}
      className={cn('text-sm', className)}
      rowHeight={rowHeight}
      {...rest}
    >
      {columns.map(
        ({ dataKey, headerContent, renderContent, ...rest }) => (
          <rt.Column key={dataKey} {...rest}>
            <rt.HeaderCell className="[&>.rs-table-cell]:bg-neutral-700 [&>.rs-table-cell]:text-white [&>.rs-table-cell-first]:rounded-l-lg [&>.rs-table-cell-last]:rounded-r-lg">
              {headerContent}
            </rt.HeaderCell>
            <rt.Cell dataKey={dataKey}>{renderContent}</rt.Cell>
          </rt.Column>
        ),
      )}
    </rt.Table>
  );
}
