import {
  createTheme,
  createThemeContract,
} from '@vanilla-extract/css';

import { DARK_COLOR_TOKEN } from './themes/dark.css';
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
export const colorToken = createThemeContract(DARK_COLOR_TOKEN);

export const darkThemeClass = createTheme(
  colorToken,
  DARK_COLOR_TOKEN,
);
export const lightThemeClass = createTheme(
  colorToken,
  LIGHT_COLOR_TOKEN,
);
