import React, { useCallback } from 'react';

import { useControlled } from '@/shared/hooks/useControlled';
import { hideScrollBar } from '@/shared/styles/global-style.css';
import { cn } from '@/shared/utils/class.util';

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

export function Tab({
  items,
  selected: selectedProp,
  onChange,
}: TabProps) {
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
      className={cn(
        'flex overflow-x-scroll gap-4 px-8 border-b border-neutral-200 touch-pan-x',
        hideScrollBar,
      )}
    >
      {items.map((item) => (
        <div
          key={item.value}
          className={cn('px-2 py-3 text-nowrap font-medium', {
            'text-neutral-400': item.value !== selected,
            'text-black border-b-2 border-black':
              item.value === selected,
          })}
          onClick={() => handleClickItem(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
