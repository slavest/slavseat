import React from 'react';

import { useSprinkleProps } from '@slavseat/ui-hooks';
import { cn } from '@slavseat/ui-utils';

import { BoxSprinkles, boxSprinkles, boxStyle } from './box.css';

// type BoxProps = BoxSprinkles & React.HTMLAttributes<HTMLDivElement>;
export type BoxProps<T extends React.ElementType> = BoxSprinkles & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof BoxSprinkles>;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type BoxComponent = <C extends React.ElementType = 'div'>(
  props: BoxProps<C> & {
    ref?: PolymorphicRef<C>;
  },
) => React.ReactNode | null;

export const Box: BoxComponent = React.forwardRef(function Box<T extends React.ElementType = 'div'>(
  { as, className, ...rest }: BoxProps<T>,
  ref: PolymorphicRef<T>,
) {
  const Element = as || 'div';
  const { sprinkleProps, nativeProps } = useSprinkleProps(rest, boxSprinkles.properties);

  return (
    <Element
      ref={ref}
      className={cn(className, boxStyle, boxSprinkles(sprinkleProps))}
      {...nativeProps}
    />
  );
});
