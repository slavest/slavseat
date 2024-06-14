import { responseProperties, typoProperties } from '@slavseat/ui-themes';
import { createSprinkles } from '@vanilla-extract/sprinkles';

export const boxSprinkles = createSprinkles(responseProperties, typoProperties);

export type BoxSprinkles = Parameters<typeof boxSprinkles>[0];
