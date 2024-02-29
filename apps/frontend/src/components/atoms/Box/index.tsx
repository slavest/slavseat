import React, { useMemo } from 'react';

import clsx from 'clsx';

import { useSprinkleProps } from '@/hooks/useSprinkleProps';

import { BoxSprinkles, boxSprinkles } from './box.css';

type BoxProps = BoxSprinkles &
  React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
  };

export const Box = ({ className, children, ...rest }: BoxProps) => {
  const { sprinkleProps, nativeProps } = useSprinkleProps(
    rest,
    boxSprinkles.properties,
  );

  return (
    <div
      className={clsx(boxSprinkles(sprinkleProps), className)}
      {...nativeProps}
    >
      {children}
    </div>
  );
};
