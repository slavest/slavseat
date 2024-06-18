import React from 'react';

import { useSprinkleProps } from '@slavseat/ui-hooks';
import { cn } from '@slavseat/ui-utils';

import { BoxSprinkles, boxSprinkles } from './box.css';

// type BoxProps = BoxSprinkles & React.HTMLAttributes<HTMLDivElement>;
export interface BoxProps<T extends React.ElementType = 'div'> extends BoxSprinkles {
  as?: T;
  className?: string;
  children?: React.ReactNode;
}

export const Box = <T extends React.ElementType = 'div'>({
  as,
  className,
  ...rest
}: BoxProps<T>) => {
  const Element = as || 'div';
  const { sprinkleProps, nativeProps } = useSprinkleProps(rest, boxSprinkles.properties);

  return <Element className={cn(className, boxSprinkles(sprinkleProps))} {...nativeProps} />;
};
