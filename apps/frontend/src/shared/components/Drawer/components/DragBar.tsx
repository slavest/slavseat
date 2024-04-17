import React from 'react';

import { useDrawerContext } from '../hooks/useDrawerContext';
import { registDragEvent } from '../utils';

export interface DragBarProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function DragBar({
  className,
  children,
  ...rest
}: DragBarProps) {
  const { direction, closeThreshold, setDragDelta, setOpen } =
    useDrawerContext();

  return (
    <div
      className={className}
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

          if (direction === 'top' && deltaY <= -closeThreshold)
            setOpen(false);
          if (direction === 'bottom' && deltaY >= closeThreshold)
            setOpen(false);
          if (direction === 'left' && deltaX <= -closeThreshold)
            setOpen(false);
          if (direction === 'right' && deltaX >= closeThreshold)
            setOpen(false);
        },
      })}
    >
      {children}
    </div>
  );
}
