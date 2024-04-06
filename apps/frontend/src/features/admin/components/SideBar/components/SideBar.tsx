import React from 'react';

import { cn } from '@/shared/utils/class.util';

import { GroupContextProvider } from '../context/groupContext';
import {
  SideBarContextProvider,
  SideBarContextProviderProps,
} from '../context/sideBarContext';

const SideBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn('w-64 py-2 bg-neutral-800', 'text-sm', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export interface SideBarProps
  extends SideBarContextProviderProps,
    Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {}

export const SideBarComponent: React.FC<SideBarProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <SideBarContextProvider {...rest}>
      <GroupContextProvider>
        <SideBar className={className}>{children}</SideBar>
      </GroupContextProvider>
    </SideBarContextProvider>
  );
};
