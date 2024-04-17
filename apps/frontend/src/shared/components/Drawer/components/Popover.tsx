import React from 'react';

import ReactPortal from '../../Portal';

interface PopoverProps extends React.PropsWithChildren {}

export function Popover({ children }: PopoverProps) {
  return (
    <ReactPortal wrapperId="react-drawer-portal">
      {children}
    </ReactPortal>
  );
}
