import React from 'react';

import { cn } from '@/shared/utils/class.util';
import { registDragEvent } from '@/shared/utils/drag.util';

import { useDrawerContext } from '../hooks/useDrawerContext';

export interface DragBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DragBar({ className, children, ...rest }: DragBarProps) {
  const { direction, closeThreshold, setDragDelta, setOpen } = useDrawerContext();

  return (
    <div
      className={cn('flex items-center justify-center px-8 py-4', className)}
      {...rest}
      {...registDragEvent({
        onDragChange: (deltaX, deltaY) => {
          if (direction === 'top') {
            if (deltaY < 0) setDragDelta(deltaY);
            else setDragDelta(Math.log(deltaY) * 2);
          }
          if (direction === 'bottom') {
            if (deltaY > 0) setDragDelta(deltaY);
            else setDragDelta(Math.log(Math.abs(deltaY)) * -2);
          }
          if (direction === 'left') {
            if (deltaX < 0) setDragDelta(deltaX);
            else setDragDelta(Math.log(deltaX) * 2);
          }
          if (direction === 'right') {
            if (deltaX > 0) setDragDelta(deltaX);
            else setDragDelta(Math.log(Math.abs(deltaX)) * -2);
          }
        },
        onDragEnd: (deltaX, deltaY) => {
          setDragDelta(0);

          if (direction === 'top' && deltaY <= -closeThreshold) setOpen(false);
          if (direction === 'bottom' && deltaY >= closeThreshold) setOpen(false);
          if (direction === 'left' && deltaX <= -closeThreshold) setOpen(false);
          if (direction === 'right' && deltaX >= closeThreshold) setOpen(false);
        },
      })}
    >
      <div className="h-1 w-20 rounded-full bg-neutral-200" />
      {children}
    </div>
  );
}
