import React from 'react';

import { cn } from '@/shared/utils/class.util';

import {
  ToggleContextProvider,
  ToggleContextProviderProps,
} from '../context';

export interface RootProps
  extends ToggleContextProviderProps,
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'children' | 'onChange' | 'defaultValue'
    > {}

export function Root({
  value,
  defaultValue,
  className,
  children,
  onChange,

  ...rest
}: RootProps) {
  return (
    <ToggleContextProvider {...{ value, defaultValue, onChange }}>
      <div
        className={cn(
          'inline-flex gap-1 p-0.5 overflow-hidden rounded-md bg-neutral-200',
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </ToggleContextProvider>
  );
}
