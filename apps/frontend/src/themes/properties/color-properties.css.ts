import { defineProperties } from '@vanilla-extract/sprinkles';

import { colorToken } from '../theme.css';
import { opacity } from '../tokens/opacity';
import { conditions } from './conditions';

export const colorProperties = defineProperties({
  conditions,
  defaultCondition: 'all',
  properties: {
    color: colorToken,
    borderColor: colorToken,
    backgroundColor: colorToken,
    opacity,
  },
});
