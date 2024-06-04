import React from 'react';

const isTouchScreen =
  typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

export const inrange = (v: number, min: number, max: number) => {
  if (v < min) return min;
  if (v > max) return max;
  return v;
};

export function registDragEvent({
  onDragChange,
  onDragEnd,
  stopPropagation,
}: {
  onDragChange?: (deltaX: number, deltaY: number, startX: number, startY: number) => void;
  onDragEnd?: (deltaX: number, deltaY: number) => void;
  stopPropagation?: boolean;
}) {
  if (isTouchScreen) {
    return {
      onTouchStart: (touchEvent: React.TouchEvent<HTMLDivElement>) => {
        if (stopPropagation) touchEvent.stopPropagation();
        const [startX, startY] = [
          touchEvent.currentTarget.scrollLeft,
          touchEvent.currentTarget.scrollTop,
        ];

        const touchMoveHandler = (moveEvent: TouchEvent) => {
          if (moveEvent.cancelable) moveEvent.preventDefault();

          const deltaX = moveEvent.touches[0].pageX - touchEvent.touches[0].pageX;
          const deltaY = moveEvent.touches[0].pageY - touchEvent.touches[0].pageY;
          onDragChange?.(deltaX, deltaY, startX, startY);
        };

        const touchEndHandler = (moveEvent: TouchEvent) => {
          const deltaX = moveEvent.changedTouches[0].pageX - touchEvent.changedTouches[0].pageX;
          const deltaY = moveEvent.changedTouches[0].pageY - touchEvent.changedTouches[0].pageY;
          onDragEnd?.(deltaX, deltaY);
          document.removeEventListener('touchmove', touchMoveHandler);
        };

        document.addEventListener('touchmove', touchMoveHandler, {
          passive: false,
        });
        document.addEventListener('touchend', touchEndHandler, {
          once: true,
        });
      },
    };
  }

  return {
    onMouseDown: (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
      if (stopPropagation) clickEvent.stopPropagation();
      const [startX, startY] = [
        clickEvent.currentTarget.scrollLeft,
        clickEvent.currentTarget.scrollTop,
      ];

      const mouseMoveHandler = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.pageX - clickEvent.pageX;
        const deltaY = moveEvent.pageY - clickEvent.pageY;
        onDragChange?.(deltaX, deltaY, startX, startY);
      };

      const mouseUpHandler = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.pageX - clickEvent.pageX;
        const deltaY = moveEvent.pageY - clickEvent.pageY;
        onDragEnd?.(deltaX, deltaY);
        document.removeEventListener('mousemove', mouseMoveHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler, {
        once: true,
      });
    },
  };
}
