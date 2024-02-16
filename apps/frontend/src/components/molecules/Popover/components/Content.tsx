import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';

import ReactPortal from '@/components/atoms/Portal';

import { usePopoverContext } from '../context';
import { popoverVariants } from '../popover.css';

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Content = ({ className, ...rest }: PopoverContentProps) => {
  const { open, handleClose, anchorEl } = usePopoverContext();
  const [pos, setPos] = useState<{ left: string; top: string }>();
  const ref = useRef<HTMLDivElement>(null);

  const calculatePos = useCallback(() => {
    const pos = anchorEl?.getBoundingClientRect();

    const xPos = pos?.x ?? 0;
    const yPos = (pos?.y ?? 0) + (pos?.height ?? 0);

    return { left: `${xPos}px`, top: `${yPos}px` };
  }, [anchorEl]);

  // useEffect(() => {
  //   calculatePos();
  //   window.addEventListener('resize', calculatePos);
  //   window.addEventListener('scroll', calculatePos);

  //   return () => {
  //     window.removeEventListener('resize', calculatePos);
  //     window.removeEventListener('scroll', calculatePos);
  //   };
  // }, [anchorEl, calculatePos]);

  // useEffect(() => {
  //   if (open) {
  //     ref.current?.focus();
  //   }
  // }, [open]);

  return (
    <ReactPortal wrapperId="react-popover-portal">
      <div
        ref={ref}
        tabIndex={-1}
        className={clsx(popoverVariants({ open }), className)}
        onBlur={() => {
          handleClose();
        }}
        style={{ ...calculatePos() }}
        {...rest}
      />
    </ReactPortal>
  );
};

export default Content;
