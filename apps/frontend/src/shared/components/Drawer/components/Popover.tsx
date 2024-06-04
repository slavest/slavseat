import React from 'react';

import { cn } from '@/shared/utils/class.util';

import ReactPortal, { ReactPortalProps } from '../../Portal';

interface PopoverProps extends React.PropsWithChildren<ReactPortalProps> {}

export function Popover({ className, wrapperId = 'react-drawer-portal', children }: PopoverProps) {
  return (
    <ReactPortal className={cn('w-full', className)} wrapperId={wrapperId}>
      {children}
    </ReactPortal>
  );
}
