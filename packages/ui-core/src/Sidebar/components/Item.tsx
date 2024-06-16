import React, { useMemo } from 'react';

import { useSidebarContext } from '../context';

interface ItemProps extends React.PropsWithChildren {
  path: string;
  activeIcon?: React.ReactNode;
  inactiveIcon?: React.ReactNode;
}

export function Item({ path, activeIcon, inactiveIcon, children }: ItemProps) {
  const { location } = useSidebarContext();

  const isActive = useMemo(() => location === path, [location, path]);

  return (
    <div>
      {activeIcon && isActive ? activeIcon : null}
      {inactiveIcon && isActive ? inactiveIcon : null}
      {children}
    </div>
  );
}
