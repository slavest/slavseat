import React from 'react';

import { motion } from 'framer-motion';

import { cn } from '@/shared/utils/class.util';

import { useDrawerContext } from '../hooks/useDrawerContext';

export interface BackdropProps
  extends React.ComponentPropsWithoutRef<typeof motion.div> {
  closeOnClick?: boolean;
}

export function Backdrop({
  closeOnClick = true,
  className,
  onClick,
  ...rest
}: BackdropProps) {
  const { open, setOpen } = useDrawerContext();

  return (
    <motion.div
      className={cn(
        'absolute top-0 w-full h-full bg-black bg-opacity-20 overflow-hidden',
        className,
      )}
      variants={{
        open: {
          opacity: 1,
          display: 'block',
          transitionEnd: {
            display: 'block',
          },
        },
        close: {
          opacity: 0,
          transitionEnd: {
            display: 'none',
          },
        },
      }}
      initial={open ? 'open' : 'close'}
      animate={open ? 'open' : 'close'}
      onClick={(e) => {
        closeOnClick && setOpen(false);
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
