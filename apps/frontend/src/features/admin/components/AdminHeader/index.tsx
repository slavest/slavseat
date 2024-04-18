import React from 'react';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center p-2 border-b border-neutral-200 h-[var(--var-admin-header-height)]">
      <div className="font-semibold">{title}</div>
      <div>
        <div className="w-8 h-8 rounded-full bg-neutral-400"></div>
      </div>
    </div>
  );
}
