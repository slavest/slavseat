import React, { useMemo } from 'react';

import { cn } from '@slavseat/ui-utils';

import { useSidebarContext } from '../context';
import { itemStyle } from '../sidebar.css';

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  path: string;
  activeIcon?: React.ReactNode;
  inactiveIcon?: React.ReactNode;
}

export function Item({ path, activeIcon, inactiveIcon, children, className, ...rest }: ItemProps) {
  const { location } = useSidebarContext();

  const active = useMemo(() => location === path, [location, path]);

  return (
    <div className={cn(itemStyle({ active }), className)} {...rest}>
      {activeIcon && active ? activeIcon : null}
      {inactiveIcon && active ? inactiveIcon : null}
      {children}
    </div>
  );
}
