import React, { ComponentProps, PropsWithChildren } from 'react';

import { Drawer as VaulDrawer } from 'vaul';

import { cn } from '@/shared/utils/class.util';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

// TODO: Trigger를 쓰고 싶을때는... 나중에 생각 해보도록 하자...
export function Drawer({ children, open, onClose }: PropsWithChildren<DrawerProps>) {
  return (
    <VaulDrawer.Root open={open} onClose={onClose}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/5" onClick={onClose} />
        <VaulDrawer.Content
          className={cn(
            'fixed inset-x-0 bottom-0 z-50',
            'h-auto max-w-[50rem]',
            'flex flex-col',
            'mx-auto p-8',
            'rounded-t-2xl bg-white shadow-blur outline-none',
          )}
        >
          {children}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}

const FLOATING_DRAWER_OVERLAY_CLASS = cn('fixed inset-0 bg-black/30');

const FLOATING_DRAWER_CONTENT_CLASS = cn(
  'fixed inset-x-6 bottom-6 z-50',
  'max-w-[50rem] h-auto',
  'flex flex-col',
  'mx-auto p-8',
  'bg-white rounded-xl outline-none',
  'after:hidden',
);

interface FloatingDrawerProps extends DrawerProps {}

function FloatingDrawerImpl({ children, open, onClose }: PropsWithChildren<FloatingDrawerProps>) {
  return (
    <VaulDrawer.Root open={open} onClose={onClose}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className={FLOATING_DRAWER_OVERLAY_CLASS} onClick={onClose} />
        <VaulDrawer.Content className={FLOATING_DRAWER_CONTENT_CLASS}>
          {children}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}

// Trigger 사용하게 될 경우
type FloatingDrawerRootProps = ComponentProps<typeof VaulDrawer.Root>;

function FloatingDrawerRoot(props: FloatingDrawerRootProps) {
  return <VaulDrawer.Root {...props} />;
}

type FloatingDrawerTriggerProps = ComponentProps<typeof VaulDrawer.Trigger>;

function FloatingDrawerTrigger(props: FloatingDrawerTriggerProps) {
  return <VaulDrawer.Trigger {...props} />;
}

function FloatingDrawerChildren({ children }: PropsWithChildren) {
  return (
    <VaulDrawer.Portal>
      <VaulDrawer.Overlay className={FLOATING_DRAWER_OVERLAY_CLASS} />
      <VaulDrawer.Content className={FLOATING_DRAWER_CONTENT_CLASS}>{children}</VaulDrawer.Content>
    </VaulDrawer.Portal>
  );
}

export const FloatingDrawer = Object.assign(FloatingDrawerImpl, {
  Root: FloatingDrawerRoot,
  Trigger: FloatingDrawerTrigger,
  Children: FloatingDrawerChildren,
});
