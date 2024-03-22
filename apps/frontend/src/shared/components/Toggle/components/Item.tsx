import React, { useCallback } from 'react';

import { cn } from '@/shared/utils/class.util';

import { useToggleContext } from '../context';

export interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function Item({
  value,
  children,
  onClick,
  className,
  ...rest
}: ItemProps) {
  const { value: contextValue, onChange } = useToggleContext();

  const handleClickItem = useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    (e) => {
      onChange(value);
      onClick?.(e);
    },
    [onChange, onClick, value],
  );

  return (
    <div
      onClick={handleClickItem}
      className={cn(
        'px-2 py-1 rounded-md text-neutral-400 text-xs transition-colors',
        { 'text-white bg-primary': contextValue === value },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
