import { createSprinkles } from '@vanilla-extract/sprinkles';

import { colorProperties } from '@/themes/properties/color-properties.css';
import { responseProperties } from '@/themes/properties/responsive-properties.css';
import { typoProperties } from '@/themes/properties/typo-properties.css';

export const boxSprinkles = createSprinkles(
  responseProperties,
  typoProperties,
  colorProperties,
);

export type BoxSprinkles = Parameters<typeof boxSprinkles>[0];
