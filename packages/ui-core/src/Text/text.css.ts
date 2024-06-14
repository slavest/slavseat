import {
  colorProperties,
  colorToken,
  responseProperties,
  typoProperties,
} from '@slavseat/ui-themes';
import { recipe } from '@vanilla-extract/recipes';
import { createSprinkles } from '@vanilla-extract/sprinkles';

export const textSprinkles = createSprinkles(responseProperties, typoProperties, colorProperties);

export const textVariants = recipe({
  variants: {
    color: {
      base: { color: colorToken['common.text.base'] },
      sub: { color: colorToken['common.text.sub'] },
    },
  },
});

export type TextSprinkles = Parameters<typeof textSprinkles>[0];
