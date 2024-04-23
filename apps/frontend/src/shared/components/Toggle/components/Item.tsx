import React, { useCallback } from 'react';

import { cn } from '@/shared/utils/class.util';

import { useToggleContext } from '../context';

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function Item({ value, children, onClick, className, ...rest }: ItemProps) {
  const { value: contextValue, onChange } = useToggleContext();

  const handleClickItem = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      onChange(value);
      onClick?.(e);
    },
    [onChange, onClick, value],
  );

  return (
    <div
      className={cn(
        'rounded-md px-2 py-1 text-xs text-neutral-400 transition-colors',
        { 'bg-primary text-white': contextValue === value },
        className,
      )}
      onClick={handleClickItem}
      {...rest}
    >
      {children}
    </div>
  );
}
