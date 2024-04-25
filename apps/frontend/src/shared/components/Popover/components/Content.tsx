import React, { useCallback, useEffect, useRef } from 'react';

import { twMerge } from 'tailwind-merge';

import ReactPortal from '@/shared/components/Portal';

import { usePopoverContext } from '../context';

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const Content = ({ className, ...rest }: PopoverContentProps) => {
  const { open, handleClose, anchorEl } = usePopoverContext();
  const ref = useRef<HTMLDivElement>(null);

  const getAnchorPos = useCallback(() => {
    const pos = anchorEl?.getBoundingClientRect();

    const yPos = (pos?.y ?? 0) + (pos?.height ?? 0);
    return { left: `${pos?.x ?? 0}px`, top: `${yPos ?? 0}px` };
  }, [anchorEl]);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
    }
  }, [open]);

  return (
    <ReactPortal wrapperId="react-popover-portal">
      <div
        ref={ref}
        className={twMerge(className, open ? 'block' : 'hidden')}
        style={{ ...getAnchorPos() }}
        tabIndex={-1}
        onBlur={() => {
          handleClose();
        }}
        {...rest}
      />
    </ReactPortal>
  );
};

export default Content;
