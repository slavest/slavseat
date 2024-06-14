import React from 'react';

import { useSprinkleProps } from '@slavseat/ui-hooks';
import { cn } from '@slavseat/ui-utils';

import { BoxSprinkles, boxSprinkles } from './box.css';

type BoxProps = BoxSprinkles & React.HTMLAttributes<HTMLDivElement>;

export const Box: React.FC<BoxProps> = ({ className, ...rest }) => {
  const { sprinkleProps, nativeProps } = useSprinkleProps(rest, boxSprinkles.properties);

  return <div className={cn(boxSprinkles(sprinkleProps), className)} {...nativeProps} />;
};
