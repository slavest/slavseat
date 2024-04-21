import React from 'react';

type FlattenKeys<T> = T extends object | Array<never>
  ? T extends Array<never>
    ? never
    : {
        [K in keyof T]-?: K extends string ? K | `${K}.${FlattenKeys<T[K]>}` : never;
      }[keyof T]
  : never;

export interface DraggableTableColumn<T> {
  dataKey: FlattenKeys<T>;
  headerContent: React.ReactNode;
  renderContent?: (value: T) => React.ReactNode;
}
