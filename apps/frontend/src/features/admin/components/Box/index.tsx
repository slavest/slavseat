import React from 'react';

import { cn } from '@/shared/utils/class.util';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  innerPadding?: boolean;
  fullWidth?: boolean;
  innerClassName?: string;
}

export function Box({
  title,
  innerPadding = true,
  fullWidth = false,
  innerClassName,
  children,
  ...rest
}: BoxProps) {
  return (
    <div {...rest}>
      <div className="text-sm text-zinc-500">{title}</div>
      <div
        className={cn(
          'inline-block space-x-2 rounded-md border-2 border-dashed border-zinc-500',
          { 'p-4': innerPadding, 'w-full': fullWidth },
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
