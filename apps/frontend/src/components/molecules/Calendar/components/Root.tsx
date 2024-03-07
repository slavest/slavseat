import React from 'react';

import {
  CalendarContextProvider,
  CalendarContextProviderProps,
} from '../context';

export interface RootProps extends CalendarContextProviderProps {}
const Root = ({ children, ...rest }: RootProps) => {
  return (
    <CalendarContextProvider {...rest}>
      {children}
    </CalendarContextProvider>
  );
};

export default Root;
