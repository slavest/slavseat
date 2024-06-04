import React, { useCallback, useState } from 'react';

import { useControlled } from '../../hooks/useControlled';

interface DrawerContextState {
  direction: 'top' | 'left' | 'right' | 'bottom';
  closeThreshold: number;
  dragDelta: number;
  setDragDelta: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DrawerContext = React.createContext<DrawerContextState>({
  direction: 'bottom',
  closeThreshold: 0,
  dragDelta: 0,
  setDragDelta: () => {},
  open: false,
  setOpen: () => {},
});

export interface DrawerContextProviderProps {
  /** @description default open 여부 */
  defaultOpen?: boolean;
  /** @description open 여부 */
  open?: boolean;
  /**
   * @description 닫기 제한 거리
   * @default closeThreshold=50
   */
  closeThreshold?: DrawerContextState['closeThreshold'];
  /**
   * @description 스크롤 방향
   * @default direction="bottom"
   */
  direction?: DrawerContextState['direction'];
  /** @description open 값 변경 이벤트 */
  onOpen?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function DrawerContextProvider({
  open: openProps,
  closeThreshold = 50,
  defaultOpen = false,
  direction = 'bottom',
  onOpen,
  children,
}: DrawerContextProviderProps) {
  const [open, setOpen] = useControlled(defaultOpen, openProps);
  const [dragDelta, setDragDelta] = useState(0);

  const handleOpen = useCallback(
    (value: boolean) => {
      setOpen(value);
      onOpen?.(value);
    },
    [setOpen, onOpen],
  );

  return (
    <DrawerContext.Provider
      value={{
        open,
        setOpen: handleOpen,
        direction,
        closeThreshold,
        dragDelta,
        setDragDelta,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
