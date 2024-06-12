import { defineProperties } from '@vanilla-extract/sprinkles';

import { fontSize } from '../tokens/font-size';
import { fontWeight } from '../tokens/font-weight';
import { conditions } from './conditions';

export const typoProperties = defineProperties({
  conditions,
  defaultCondition: 'all',
  properties: {
    fontSize,
    fontWeight,
  },
});
