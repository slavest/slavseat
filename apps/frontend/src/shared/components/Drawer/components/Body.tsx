import React, { useMemo } from 'react';

import { motion } from 'framer-motion';

import { cn } from '@/shared/utils/class.util';

import { useDrawerContext } from '../hooks/useDrawerContext';
import { getAxis } from '../utils';

export interface BodyProps extends React.ComponentPropsWithoutRef<typeof motion.div> {}

export function Body({ className, children, ...rest }: BodyProps) {
  const { open, direction, dragDelta } = useDrawerContext();

  const transform = useMemo(() => {
    const axis = getAxis(direction);
    let x = '';
    let y = '';

    if (axis === 'x') y = `-50%`;
    else x = `-50%`;

    if (open) {
      if (axis === 'x') x = `${dragDelta}px`;
      else y = `${dragDelta}px`;
    }

    if (open === false) {
      if (direction === 'bottom') y = `100%`;
      if (direction === 'top') y = `-100%`;
      if (direction === 'left') x = `-100%`;
      if (direction === 'right') x = `100%`;
    }

    return { x: x || undefined, y: y || undefined };
  }, [direction, dragDelta, open]);

  return (
    <motion.div
      animate={[direction, open ? 'open' : 'close']}
      className={cn(
        'fixed inset-x-0 mx-auto w-full max-w-[35rem] rounded-2xl bg-white px-8',
        className,
      )}
      custom={transform}
      initial={[direction, open ? 'open' : 'close']}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 500,
        duration: dragDelta ? 0 : 0.5,
      }}
      variants={{
        bottom: {
          left: '50%',
          right: 'auto',
          top: 'auto',
          bottom: 0,
        },
        top: {
          left: '50%',
          right: 'auto',
          top: 0,
          bottom: 'auto',
        },
        left: {
          left: 0,
          right: 'auto',
          top: '50%',
          bottom: 'auto',
        },
        right: {
          left: 'auto',
          right: 0,
          top: '50%',
          bottom: 'auto',
        },
        open: {
          display: 'block',
          transitionEnd: {
            display: 'block',
          },
          ...transform,
        },
        close: {
          transition: {
            type: 'just',
          },
          transitionEnd: {
            display: 'none',
          },
          ...transform,
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
