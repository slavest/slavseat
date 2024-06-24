import React, { useCallback, useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

import { cn } from '@/shared/utils/class.util';

import { GroupContextProvider } from '../context/groupContext';
import { useGroupContext } from '../hooks/useGroupContext';
import { useSideBarContext } from '../hooks/useSideBarContext';

export interface ItemGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  groupKey: string;
  label: string;
  depth?: number;
}

export const ItemGroup: React.FC<ItemGroupProps> = ({
  groupKey,
  label,
  children,
}) => {
  const { activated } = useSideBarContext();
  const { depth } = useGroupContext();

  const [expanded, setExpanded] = useState(
    activated && activated.startsWith(groupKey),
  );

  const handleClickGroupButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      setExpanded((p) => !p);
    },
    [],
  );

  return (
    <GroupContextProvider depth={depth + 1}>
      <div
        className={cn({
          'bg-neutral-800': expanded,
        })}
      >
        <div className={cn('px-4 py-0.5')}>
          <button
            className={cn(
              'flex items-center justify-between',
              'w-full py-2 mx-auto',
              'text-neutral-500 text-left',
              {
                'text-neutral-400 hover:text-neutral-200': expanded,
                'hover:text-neutral-400': !expanded,
                // 'pl-4': depth === 1,
                // 'pl-4': depth === 2,
                // 'pl-6': depth === 3,
              },
            )}
            onClickCapture={handleClickGroupButton}
          >
            {label}
            {expanded && <HiChevronUp />}
            {!expanded && <HiChevronDown />}
          </button>
        </div>
        <div
          className={cn([
            'hidden',
            {
              block: expanded,
              'border-l border-neutral-600 rounded-l-none ml-8':
                expanded,
            },
          ])}
        >
          {children}
        </div>
      </div>
    </GroupContextProvider>
  );
};
