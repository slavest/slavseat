import React from 'react';

import { useSprinkleProps } from '@/shared/hooks/useSprinkleProps';
import { cn } from '@/shared/utils/class.util';

import { TextSprinkles, textSprinkles, textStyles } from './text.css';

export type TextProps = React.HTMLAttributes<HTMLSpanElement> & TextSprinkles;

export const Text: React.FC<TextProps> = ({ className, ...rest }) => {
  const { sprinkleProps, nativeProps } = useSprinkleProps(rest, textSprinkles.properties);

  return (
    <span className={cn(textSprinkles(sprinkleProps), textStyles, className)} {...nativeProps} />
  );
};
