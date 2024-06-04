import React from 'react';

import { DrawerContextProvider, DrawerContextProviderProps } from '../context';

export interface RootProps extends DrawerContextProviderProps {}

export function Root({ children, ...rest }: DrawerContextProviderProps) {
  return <DrawerContextProvider {...rest}>{children}</DrawerContextProvider>;
}
