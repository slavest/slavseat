import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import clsx from 'clsx';

import ReactPortal from '@/shared/components/Portal';

import { usePopoverContext } from '../context';
import { popoverVariants } from '../popover.css';

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

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
        tabIndex={-1}
        className={clsx(popoverVariants({ open }), className)}
        onBlur={() => {
          handleClose();
        }}
        style={{ ...getAnchorPos() }}
        {...rest}
      />
    </ReactPortal>
  );
};

export default Content;
