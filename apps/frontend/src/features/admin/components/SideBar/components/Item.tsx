import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';

import { cn } from '@/shared/utils/class.util';

import { useGroupContext } from '../hooks/useGroupContext';
import { useSideBarContext } from '../hooks/useSideBarContext';
import { comparePath } from '../util/compare';

export interface SideBarItem {
  value: string;
  itemKey?: string;
}

interface ItemProps
  extends SideBarItem,
    React.HTMLAttributes<HTMLButtonElement> {}

const Item: React.FC<ItemProps> = ({
  value,
  itemKey,
  children,
  className,
  ...rest
}) => {
  const { activated, itemClickHandler } = useSideBarContext();

  const handleClickMenuItem = useCallback(() => {
    itemClickHandler({ value });
  }, [itemClickHandler, value]);

  const isActivated = useMemo(() => {
    const key = itemKey ?? value;
    return (
      activated === value ||
      (activated && comparePath(key, activated))
    );
  }, [activated, itemKey, value]);

  return (
    <div className={cn('px-2 py-0.5')}>
      <button
        className={cn(
          'w-full p-2',
          'box-border',
          'rounded-md',
          'text-left',
          'text-neutral-400 hover:text-neutral-200',
          'focus:(outline-zinc-800 outline-offset-2 outline-8) transition-colors',
          {
            'bg-violet-500 text-white': isActivated,
            'hover:(bg-white bg-opacity-10) text-neutral-500':
              !isActivated,
            // 'pl-4': depth === 1,
            // 'pl-6': depth === 2,
            // 'pl-8': depth === 3,
            // 'pl-10': depth === 4,
            // 'pl-12': depth === 5,
            // 'pl-14': depth === 6,
          },
          className,
        )}
        onClick={handleClickMenuItem}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default Item;
