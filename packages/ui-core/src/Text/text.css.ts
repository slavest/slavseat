import { colorProperties, responseProperties, typoProperties } from '@slavseat/ui-themes';
import { createSprinkles } from '@vanilla-extract/sprinkles';

export const textSprinkles = createSprinkles(responseProperties, typoProperties, colorProperties);

export type TextSprinkles = Parameters<typeof textSprinkles>[0];
