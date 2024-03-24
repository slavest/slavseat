import { style } from '@vanilla-extract/css';
import { createSprinkles } from '@vanilla-extract/sprinkles';

import { colorProperties } from '@/themes/properties/color-properties.css';
import { responseProperties } from '@/themes/properties/responsive-properties.css';
import { typoProperties } from '@/themes/properties/typo-properties.css';
import { colorToken } from '@/themes/theme.css';

export const textStyles = style({
  color: colorToken['text.primary'],
});

export const textSprinkles = createSprinkles(
  responseProperties,
  typoProperties,
  colorProperties,
);

export type TextSprinkles = Parameters<typeof textSprinkles>[0];
