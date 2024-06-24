import React, { Dispatch, PropsWithChildren } from 'react';

import { ReserveDispatchContext, ReserveMaterialContext } from '../hooks/useReserveContext';
import { ReserveAction, ReserveMaterial } from '../hooks/useReserveReducer';

interface ReserveMaterialProviderProps {
  material: ReserveMaterial;
}

// TODO: 최적화...?
export function ReserveMaterialProvider({
  children,
  material,
}: PropsWithChildren<ReserveMaterialProviderProps>) {
  return (
    <ReserveMaterialContext.Provider value={material}>{children}</ReserveMaterialContext.Provider>
  );
}

interface ReserveDispatchProviderProps {
  dispatch: Dispatch<ReserveAction>;
}

// TODO: 최적화...?
export function ReserveDispatchProvider({
  children,
  dispatch,
}: PropsWithChildren<ReserveDispatchProviderProps>) {
  return (
    <ReserveDispatchContext.Provider value={dispatch}>{children}</ReserveDispatchContext.Provider>
  );
}
