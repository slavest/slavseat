import {
  baseToken,
  colorProperties,
  responseProperties,
  typoProperties,
} from '@slavseat/ui-themes';
import { style } from '@vanilla-extract/css';
import { createSprinkles } from '@vanilla-extract/sprinkles';

export const boxSprinkles = createSprinkles(responseProperties, typoProperties, colorProperties);

export const boxStyle = style({
  ...baseToken.transition.colors,
});

export type BoxSprinkles = Parameters<typeof boxSprinkles>[0];
