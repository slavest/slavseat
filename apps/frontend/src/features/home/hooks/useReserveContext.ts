import { Dispatch, createContext, useContext } from 'react';

import { ReserveAction, ReserveMaterial } from './useReserveReducer';

export const ReserveMaterialContext = createContext<ReserveMaterial | null>(null);
export const ReserveDispatchContext = createContext<Dispatch<ReserveAction> | null>(null);

export function useReserveMaterialContext() {
  const reserveMaterial = useContext(ReserveMaterialContext);

  if (!reserveMaterial) {
    throw new Error(
      'useReserveMaterialContext는 ReserveMaterialProvider 내부에서 사용이 가능합니다.',
    );
  }

  return reserveMaterial;
}

export function useReserveDispatchContext() {
  const reserveDispatch = useContext(ReserveDispatchContext);

  if (!reserveDispatch) {
    throw new Error(
      'useReserveDispatchContext는 ReserveDispatchProvider 내부에서 사용이 가능합니다.',
    );
  }

  return reserveDispatch;
}
