import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

export const useControlled = <T = unknown>(
  defaultValue: T,
  valueProp?: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const { current: isControlled } = useRef(valueProp !== undefined);

  const [state, setState] = useState<T>(defaultValue);

  const value = isControlled ? valueProp! : state;
  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (newState) => {
      !isControlled && setState(newState);
    },
    [isControlled],
  );

  return [value, setValue];
};
