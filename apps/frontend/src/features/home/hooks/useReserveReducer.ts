import { useReducer } from 'react';

import { Model } from '@slavseat/types';

import { ReserveData } from '@/shared/api/reserve';

type DrawerStep = 'info' | 'addReserve';
type FloatingDrawerStep = 'overrideNotice' | 'overrideReserve' | 'alwayUserNotice';

export interface ReserveMaterial {
  drawerStep: DrawerStep;
  floatingDrawerStep: FloatingDrawerStep;
  selectedDate: Date;
  selectedFacility?: Model.FacilitySummary;
  exist?: {
    existsReserve: Model.ReserveInfo;
    reserveFormData: ReserveData;
  };
}

export type ReserveAction =
  | { type: 'SELECT_DATE'; date: Date }
  | { type: 'SELECT_FACILITY'; facility: Model.FacilitySummary }
  | { type: 'READY_ADD_RESERVE' }
  | { type: 'SUCCESS_ADD_RESERVE' }
  | { type: 'CANCEL_ADD_RESERVE' }
  | {
      type: 'CONFLICT_RESERVE';
      existsReserve: Model.ReserveInfo;
      reserveFormData: ReserveData;
    }
  | {
      type: 'CANCEL_OVERRIDE_RESERVE';
    }
  | {
      type: 'READY_OVERRIDE_RESERVE';
      existsReserve: Model.ReserveInfo;
      reserveFormData: ReserveData;
    }
  | {
      type: 'FAIL_OVERRIDE_RESERVE';
    }
  | {
      type: 'SUCCESS_OVERRIDE_RESERVE';
    };

const initialMaterial: ReserveMaterial = {
  drawerStep: 'info',
  floatingDrawerStep: 'overrideNotice',
  selectedDate: new Date(),
};

function materialReducer(state: ReserveMaterial, action: ReserveAction): ReserveMaterial {
  switch (action.type) {
    case 'SELECT_DATE':
      return { ...state, selectedDate: action.date };
    case 'SELECT_FACILITY':
      return { ...state, selectedFacility: action.facility };
    case 'READY_ADD_RESERVE':
      return { ...state, drawerStep: 'addReserve' };
    case 'SUCCESS_ADD_RESERVE':
      return { ...state, drawerStep: 'info', selectedFacility: undefined };
    case 'CANCEL_ADD_RESERVE':
      return {
        ...state,
        drawerStep: 'info',
        selectedFacility: undefined,
      };
    case 'CONFLICT_RESERVE':
      return {
        ...state,
        drawerStep: 'info',
        floatingDrawerStep: action.existsReserve.always ? 'alwayUserNotice' : 'overrideNotice',
        exist: { existsReserve: action.existsReserve, reserveFormData: action.reserveFormData },
      };
    case 'CANCEL_OVERRIDE_RESERVE':
      return {
        ...state,
        drawerStep: 'info',
        floatingDrawerStep: 'overrideNotice',
        exist: undefined,
        selectedFacility: undefined,
      };
    case 'READY_OVERRIDE_RESERVE':
      return {
        ...state,
        floatingDrawerStep: 'overrideReserve',
        exist: { existsReserve: action.existsReserve, reserveFormData: action.reserveFormData },
      };
    case 'FAIL_OVERRIDE_RESERVE':
      return {
        ...state,
        drawerStep: 'info',
        floatingDrawerStep: 'overrideNotice',
        exist: undefined,
        selectedFacility: undefined,
      };
    case 'SUCCESS_OVERRIDE_RESERVE':
      return {
        ...state,
        drawerStep: 'info',
        floatingDrawerStep: 'overrideNotice',
        exist: undefined,
        selectedFacility: undefined,
      };
    default:
      break;
  }
  return state;
}

export const useReserveReducer = () => useReducer(materialReducer, initialMaterial);
