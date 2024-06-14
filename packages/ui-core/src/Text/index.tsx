import React from 'react';

import { useSprinkleProps } from '@slavseat/ui-hooks';
import { cn } from '@slavseat/ui-utils';
import { RecipeVariants } from '@vanilla-extract/recipes';

import { TextSprinkles, textSprinkles, textVariants } from './text.css';

export type TextProps = React.HTMLAttributes<HTMLSpanElement> &
  Omit<TextSprinkles, 'color'> &
  RecipeVariants<typeof textVariants>;

export const Text: React.FC<TextProps> = ({ className, color, ...rest }) => {
  const { sprinkleProps, nativeProps } = useSprinkleProps(rest, textSprinkles.properties);

  return (
    <span
      className={cn(textSprinkles(sprinkleProps), textVariants({ color }), className)}
      {...nativeProps}
    />
  );
};
