import React from 'react';

import { Box } from '@/Box';

import { SidebarContextProvider, SidebarContextProviderProps } from '../context';

interface RootProps extends SidebarContextProviderProps {}

export function Root({ ...rest }: RootProps) {
  return (
    <Box>
      <SidebarContextProvider {...rest} />
    </Box>
  );
}
