import {
  colorProperties,
  colorToken,
  responseProperties,
  typoProperties,
} from '@slavseat/ui-themes';
import { style } from '@vanilla-extract/css';
import { createSprinkles } from '@vanilla-extract/sprinkles';

export const textStyles = style({
  color: colorToken['text.primary'],
});

export const textSprinkles = createSprinkles(responseProperties, typoProperties, colorProperties);

export type TextSprinkles = Parameters<typeof textSprinkles>[0];
