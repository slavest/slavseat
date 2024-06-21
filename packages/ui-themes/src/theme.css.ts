import { createTheme, createThemeContract, layer } from '@vanilla-extract/css';

import { LIGHT_COLOR_TOKEN } from './themes/light.css';
import { fontSize } from './tokens/font-size';
import { fontWeight } from './tokens/font-weight';
import { height } from './tokens/height';
import { opacity } from './tokens/opacity';
import { radius } from './tokens/radius';
import { spacing } from './tokens/spacing';
import { transition } from './tokens/transition';
import { width } from './tokens/width';

export const [baseTokenClass, baseToken] = createTheme({
  fontSize,
  fontWeight,
  width,
  height,
  spacing,
  radius,
  transition,
  opacity,
});
export const colorToken = createThemeContract(LIGHT_COLOR_TOKEN);

export const lightThemeClass = createTheme(colorToken, LIGHT_COLOR_TOKEN);

export const componentLayer = layer('components');
export const resetLayer = layer({ parent: componentLayer }, 'reset');
