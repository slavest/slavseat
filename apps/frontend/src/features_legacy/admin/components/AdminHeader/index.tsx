import React from 'react';

import { useUserStore } from '@/shared/stores/userStore';
import { cn } from '@/shared/utils/class.util';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const { user } = useUserStore();

  return (
    <div
      className={cn(
        'h-[var(--var-admin-header-height)]',
        'flex items-center justify-between px-4',
        'border-b border-neutral-200',
        'bg-white',
      )}
    >
      <div className="font-semibold">{title}</div>
      <div>
        <div
          className={cn(
            'h-8 w-8',
            'flex items-center justify-center',
            'rounded-full',
            'bg-neutral-300',
            'text-sm font-semibold',
          )}
        >
          {user?.name.slice(0, 1)}
        </div>
      </div>
    </div>
  );
}
