import React from 'react';

import { useSprinkleProps } from '@slavseat/ui-hooks';
import { cn } from '@slavseat/ui-utils';

import { TextSprinkles, textSprinkles } from './text.css';

export type TextProps = TextSprinkles & Omit<React.ComponentProps<'span'>, 'color'>;

export const Text: React.FC<TextProps> = ({ className, ...rest }) => {
  const { sprinkleProps, nativeProps } = useSprinkleProps(rest, textSprinkles.properties);

  return <span className={cn(textSprinkles(sprinkleProps), className)} {...nativeProps} />;
};
