import React, { useState } from 'react';

import { inrange, registDragEvent } from './utils';

const HEIGHT = 32;

interface TimeSliderProps {
  slideCount: number;
}

export function TimeSlider({ slideCount }: TimeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transY, setTransY] = useState(0);

  return (
    <div
      style={{
        height: `${HEIGHT}px`,
      }}
      className="m-16 border-2 border-gray-200 overflow-visible select-none"
      {...registDragEvent({
        onDragChange: (_, deltaY) => {
          setTransY(deltaY);
        },
        onDragEnd: (_, deltaY) => {
          setCurrentIndex(
            inrange(
              Math.round((HEIGHT * currentIndex - deltaY) / HEIGHT),
              0,
              slideCount - 1,
            ),
          );
          setTransY(0);
        },
      })}
    >
      <div
        className=""
        style={{
          transform: `translateY(${
            -(HEIGHT * currentIndex) + transY
          }px)`,
          transition: `transform ${
            transY ? 0 : 150
          }ms ease-in-out 0s`,
        }}
      >
        {new Array(slideCount).fill(0).map((_, i) => (
          <div style={{ height: `${HEIGHT}px` }} key={i}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
