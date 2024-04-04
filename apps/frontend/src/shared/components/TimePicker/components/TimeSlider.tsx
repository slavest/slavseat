import React, { useCallback, useMemo, useState } from 'react';

import { useControlled } from '@/shared/hooks/useControlled';
import { cn } from '@/shared/utils/class.util';

import { inrange, registDragEvent } from '../utils';

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

  const calculateStyle = useCallback(
    (index: number): React.CSSProperties => {
      if (index === currentIndex) return { color: 'blue' };

      if (Math.abs(currentIndex - index) > viewHeight) {
        return { color: 'red' };
      }

      return {};
    },
    [currentIndex, viewHeight],
  );

  return (
    <div
      data-vaul-no-drag={true}
      style={{
        height: `${elementHeight * viewHeight * 2 + elementHeight}px`,
      }}
      className={cn(
        'relative overflow-hidden select-none text-center',
      )}
      {...registDragEvent({
        onDragChange: (_, deltaY) => {
          if (disabled) return;
          setTransY(deltaY);
        },
        onDragEnd: (_, deltaY) => {
          if (disabled) return;
          const newIndex = inrange(
            Math.round(
              (elementHeight * currentIndex - deltaY) / elementHeight,
            ),
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
        data-vaul-no-drag={true}
        className="absolute top-0 w-full bg-gradient-to-b from-white from-30% z-10"
        style={{ height: `${elementHeight * viewHeight}px` }}
      />
      <div
        data-vaul-no-drag={true}
        className="absolute bottom-0 w-full bg-gradient-to-t from-white from-30% z-10"
        style={{ height: `${elementHeight * viewHeight}px` }}
      />
      <div
        data-vaul-no-drag={true}
        style={{
          transform: `translateY(${
            -(elementHeight * currentIndex) +
            transY +
            elementHeight * viewHeight
          }px)`,
          transition: `transform ${
            transY ? 0 : 150
          }ms ease-in-out 0s`,
        }}
      >
        {new Array(slideCount).fill(0).map((_, i) => (
          <div
            data-vaul-no-drag={true}
            style={{
              height: `${elementHeight}px`,
              ...calculateStyle(i),
            }}
            key={i}
          >
            {i.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
}
