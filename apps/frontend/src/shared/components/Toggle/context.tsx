import React, { useCallback, useContext } from 'react';

import { useControlled } from '@/shared/hooks/useControlled';

interface ToggleContextState {
  value: string;
  onChange: (value: string) => void;
}

const ToggleContext = React.createContext<ToggleContextState>({
  value: '',
  onChange: () => {},
});

export interface ToggleContextProviderProps
  extends Partial<ToggleContextState> {
  children?: React.ReactNode;
  defaultValue?: string;
}

export function ToggleContextProvider({
  value: valueProp,
  defaultValue = '',
  onChange,
  children,
}: ToggleContextProviderProps) {
  const [value, setValue] = useControlled(defaultValue, valueProp);

  const handleChangeToggle = useCallback(
    (v: string) => {
      setValue(v);
      onChange?.(v);
    },
    [onChange, setValue],
  );

  return (
    <ToggleContext.Provider
      value={{ value, onChange: handleChangeToggle }}
    >
      {children}
    </ToggleContext.Provider>
  );
}

export function useToggleContext() {
  const context = useContext(ToggleContext);
  if (context === undefined)
    throw new Error(
      'useToggleContext must be used within a ToggleContextProviderProps',
    );
  return context;
}
