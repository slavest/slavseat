import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import React from 'react';

import clsx from 'clsx';

interface ScrollAreaProps {
  children?: React.ReactNode;
  className?: string;
}

function ScrollArea({ children, className }: ScrollAreaProps) {
  return (
    <RadixScrollArea.Root
      className={clsx('w-full h-full overflow-hidden', className)}
    >
      <RadixScrollArea.Viewport className="w-full h-full">
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        className="flex flex-col w-4 px-1.5 py-2"
        orientation="vertical"
      >
        <RadixScrollArea.Thumb className="bg-neutral-400 rounded-full" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Scrollbar
        className="flex h-4 px-2 py-1.5"
        orientation="horizontal"
      >
        <RadixScrollArea.Thumb className="bg-neutral-400 rounded-full" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner />
    </RadixScrollArea.Root>
  );
}

export default ScrollArea;
