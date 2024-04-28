import React, { Dispatch, PropsWithChildren } from 'react';

import { ReserveDispatchContext, ReserveMaterialContext } from '../hooks/useReserveContext';
import { ReserveAction, ReserveMaterial } from '../hooks/useReserveReducer';

interface DrawerProviderProps {
  material: ReserveMaterial;
  dispatch: Dispatch<ReserveAction>;
}

export function DrawerProvider({
  children,
  material,
  dispatch,
}: PropsWithChildren<DrawerProviderProps>) {
  return (
    <ReserveMaterialContext.Provider value={material}>
      <ReserveDispatchContext.Provider value={dispatch}>{children}</ReserveDispatchContext.Provider>
    </ReserveMaterialContext.Provider>
  );
}
