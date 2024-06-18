import { colorProperties, responseProperties, typoProperties } from '@slavseat/ui-themes';
import { createSprinkles } from '@vanilla-extract/sprinkles';

export const boxSprinkles = createSprinkles(responseProperties, typoProperties, colorProperties);

export type BoxSprinkles = Parameters<typeof boxSprinkles>[0];
