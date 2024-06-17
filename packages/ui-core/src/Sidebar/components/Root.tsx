import React from 'react';

import { SidebarContextProvider, SidebarContextProviderProps } from '../context';
import { rootStyle } from '../sidebar.css';

interface RootProps extends SidebarContextProviderProps {}

export function Root({ ...rest }: RootProps) {
  return (
    <div className={rootStyle}>
      <SidebarContextProvider {...rest} />
    </div>
  );
}
