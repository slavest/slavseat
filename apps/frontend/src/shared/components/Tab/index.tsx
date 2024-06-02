import React, { useCallback, useRef } from 'react';

import { useControlled } from '@/shared/hooks/useControlled';
import { hideScrollBar } from '@/shared/styles/global-style.css';
import { cn } from '@/shared/utils/class.util';

import { registDragEvent } from '../TimePicker/utils';

// FIXME: 대충 구현한 탭 UI, 제대로 컴포넌트로 다시 구현 필요
interface TabItem {
  value: string;
  label: string;
}

interface TabProps {
  items: TabItem[];
  selected?: string | null;
  onChange?: (value: string | null) => void;
}

export function Tab({ items, selected: selectedProp, onChange }: TabProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number>(0);

  const [selected, setSelected] = useControlled(null, selectedProp);

  const handleClickItem = useCallback(
    (item: TabItem) => {
      let newSelect;
      if (selected === item.value) newSelect = null;
      else newSelect = item.value;

      setSelected(newSelect);
      onChange?.(newSelect);
    },
    [onChange, selected, setSelected],
  );

  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex touch-pan-x gap-4 overflow-x-scroll border-b border-neutral-200 px-8',
        hideScrollBar,
      )}
      {...registDragEvent({
        onDragChange: (deltaX, _, startX) => {
          if (!scrollRef.current) return;
          dragStartX.current = scrollRef.current.scrollLeft;
          scrollRef.current.scrollLeft = -deltaX + startX;
        },
      })}
    >
      {items.map((item) => (
        <div
          key={item.value}
          className={cn('text-nowrap px-2 py-3 font-medium', 'cursor-pointer', {
            'text-neutral-400': item.value !== selected,
            'border-b-2 border-black text-black': item.value === selected,
          })}
          onClick={() => handleClickItem(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
