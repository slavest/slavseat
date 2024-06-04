import React from 'react';
import { IoMdRefresh } from 'react-icons/io';

import { cn } from '@/shared/utils/class.util';

interface RefreshProps {
  onClick?: () => void;
}

export function Refresh({ onClick }: RefreshProps) {
  return (
    <div
      className={cn(
        'h-[2.625rem] w-[2.625rem] max-w-[50rem]',
        'absolute right-4 top-[12rem]',
        'flex items-center justify-center gap-x-1',
        'rounded-3xl border',
        'bg-white shadow-xl',
        'text-xs font-semibold',
        'select-none',
      )}
    >
      <IoMdRefresh
        className="cursor-pointer transition-transform hover:rotate-90"
        size={24}
        onClick={onClick}
      />
    </div>
  );
}
