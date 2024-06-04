import React, { useCallback, useMemo, useState } from 'react';

import { useControlled } from '@/shared/hooks/useControlled';
import { cn } from '@/shared/utils/class.util';
import { inrange, registDragEvent } from '@/shared/utils/drag.util';

interface TimeSliderProps {
  slideCount: number;
  elementHeight?: number;
  viewHeight?: number;
  value?: number;
  disabled?: boolean;
  onChange?: (v: number) => void;
}

export function TimeSlider({
  slideCount,
  elementHeight = 32,
  viewHeight = 1,
  value,
  disabled,
  onChange,
}: TimeSliderProps) {
  const [currentIndex, setCurrentIndex] = useControlled(0, value);
  const [transY, setTransY] = useState(0);

  const elementCount = useMemo(() => slideCount, [slideCount]);

  const calculateStyle = useCallback((index: number): React.CSSProperties => {
    // if (index === currentIndex) return { color: 'blue' };

    // if (Math.abs(currentIndex - index) > viewHeight) {
    //   return { color: 'red' };
    // }

    return {};
  }, []);

  return (
    <div
      className={cn('relative select-none overflow-hidden text-center')}
      style={{
        height: `${elementHeight * viewHeight * 2 + elementHeight}px`,
      }}
      {...registDragEvent({
        onDragChange: (_, deltaY) => {
          if (disabled) return;
          setTransY(deltaY);
        },
        onDragEnd: (_, deltaY) => {
          if (disabled) return;
          const newIndex = inrange(
            Math.round((elementHeight * currentIndex - deltaY) / elementHeight),
            0,
            elementCount - 1,
          );
          setTransY(0);
          setCurrentIndex(newIndex);
          onChange?.(newIndex);
        },
      })}
    >
      <div
        className="absolute top-0 z-10 w-full bg-gradient-to-b from-white from-30%"
        style={{ height: `${elementHeight * viewHeight}px` }}
      />
      <div
        className="absolute bottom-0 z-10 w-full bg-gradient-to-t from-white from-30%"
        style={{ height: `${elementHeight * viewHeight}px` }}
      />
      <div
        style={{
          transform: `translateY(${
            -(elementHeight * currentIndex) + transY + elementHeight * viewHeight
          }px)`,
          transition: `transform ${transY ? 0 : 150}ms ease-in-out 0s`,
        }}
      >
        {new Array(slideCount).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              height: `${elementHeight}px`,
              ...calculateStyle(i),
            }}
          >
            {i.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
}
