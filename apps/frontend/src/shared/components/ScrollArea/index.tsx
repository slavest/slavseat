import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import React from 'react';

import { cn } from '@/shared/utils/class.util';

interface ScrollAreaProps {
  children?: React.ReactNode;
  className?: string;
}

function ScrollArea({ children, className }: ScrollAreaProps) {
  return (
    <RadixScrollArea.Root className={cn('h-full w-full overflow-hidden', className)}>
      <RadixScrollArea.Viewport className="h-full w-full">{children}</RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar className="flex w-4 flex-col px-1.5 py-2" orientation="vertical">
        <RadixScrollArea.Thumb className="rounded-full bg-neutral-400" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Scrollbar className="flex h-4 px-2 py-1.5" orientation="horizontal">
        <RadixScrollArea.Thumb className="rounded-full bg-neutral-400" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner />
    </RadixScrollArea.Root>
  );
}

export default ScrollArea;
