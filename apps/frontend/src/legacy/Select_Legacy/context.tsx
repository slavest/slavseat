import React, { useCallback, useState } from 'react';

import { useControlled } from '@/shared/hooks/useControlled';

export interface SelectItem {
  id: string;
  label: React.ReactNode;
  value: string;
}

interface SelectContextState {
  items: SelectItem[];
  addItem: (item: SelectItem) => void;
  removeItem: (id: string) => void;
  selected: string[];
  handleSelectItem: (selected: SelectItem) => void;
  multiSelect: boolean;
}
export const SelectContext = React.createContext<SelectContextState>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  selected: [],
  handleSelectItem: () => {},
  multiSelect: false,
});

export interface SelectContextProviderProps
  extends Pick<
    Partial<SelectContextState>,
    'selected' | 'multiSelect'
  > {
  children?: React.ReactNode;
  onSelect?: (selected: SelectItem[]) => void;
}
export const SelectContextProvider = ({
  selected: selectedProp,
  multiSelect = false,
  children,
  onSelect,
}: SelectContextProviderProps) => {
  const [items, setItems] = useState<SelectItem[]>([]);
  const [selected, setSelected] = useControlled([], selectedProp);

  const addItem = useCallback<SelectContextState['addItem']>(
    (item) => {
      setItems((prev) => {
        const index = prev.findIndex((i) => i.id === item.id);
        if (index === -1) {
          return [...prev, item];
        }
        return prev;
      });
    },
    [],
  );

  const removeItem = useCallback<SelectContextState['removeItem']>(
    (id) => {
      setItems((prev) => {
        const index = prev.findIndex((i) => i.id === id);
        if (index !== -1) {
          return [...prev.slice(0, index), ...prev.slice(index + 1)];
        }
        return prev;
      });
    },
    [],
  );

  const handleSelectItem = useCallback<
    SelectContextState['handleSelectItem']
  >(
    (item) => {
      let newState: typeof selected = [];

      if (multiSelect) {
        const index = selected.findIndex(
          (selectedItem) => selectedItem === item.id,
        );
        if (index === -1) {
          newState = [...selected, item.id];
        } else {
          newState = [
            ...selected.slice(0, index),
            ...selected.slice(index + 1),
          ];
        }
      } else {
        const index = selected.findIndex(
          (selectedItem) => selectedItem === item.id,
        );
        if (index === -1) {
          newState = [item.id];
        }
      }

      setSelected(newState);
      onSelect?.(
        newState.map((id) => items.find((item) => item.id === id)!),
      );
    },
    [items, multiSelect, onSelect, selected, setSelected],
  );

  return (
    <SelectContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        selected,
        handleSelectItem,
        multiSelect,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

export const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (context === undefined) {
    throw new Error(
      'useSelectContext must be used within a SelectProvider',
    );
  }
  return context;
};
