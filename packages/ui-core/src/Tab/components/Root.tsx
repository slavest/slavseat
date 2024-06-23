import React from 'react';

import { TabContextProvider, TabContextProviderProps } from '../context';

interface RootProps extends TabContextProviderProps {}

export function Root(props: RootProps) {
  return <TabContextProvider {...props} />;
}
