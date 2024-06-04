import React, { useCallback } from 'react';

import { useDrawerContext } from '../hooks/useDrawerContext';

export interface TriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Trigger({ children, onClick, ...rest }: TriggerProps) {
  const { open, setOpen } = useDrawerContext();

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      setOpen(!open);

      onClick?.(e);
    },
    [onClick, open, setOpen],
  );

  return (
    <div onClick={handleClick} {...rest}>
      {children}
    </div>
  );
}
