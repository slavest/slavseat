import React, { PropsWithChildren } from 'react';

import { Drawer as VaulDrawer } from 'vaul';

import { cn } from '@/shared/utils/class.util';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

// TODO: Trigger를 쓰고 싶을때는... 나중에 생각 해보도록 하자...
export function Drawer({
  children,
  open,
  onClose,
}: PropsWithChildren<DrawerProps>) {
  return (
    <VaulDrawer.Root open={open} onClose={onClose}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay
          className="fixed inset-0 bg-black/5"
          onClick={onClose}
        />
        <VaulDrawer.Content
          className={cn(
            'fixed inset-x-0 bottom-0 z-50',
            'max-w-[50rem] h-auto',
            'flex flex-col',
            'mx-auto p-8',
            'bg-white rounded-t-2xl shadow-blur outline-none',
          )}
        >
          {children}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
