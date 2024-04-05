import React from 'react';

import { cn } from '@/shared/utils/class.util';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  innerPadding?: boolean;
}

export function Box({
  title,
  innerPadding = true,
  children,
  ...rest
}: BoxProps) {
  return (
    <div {...rest}>
      <div className="text-zinc-500 text-sm">{title}</div>
      <div
        className={cn(
          'inline-block border-dashed border-2 rounded-md border-zinc-500 space-x-2',
          { 'p-4': innerPadding },
        )}
      >
        {children}
      </div>
    </div>
  );
}
