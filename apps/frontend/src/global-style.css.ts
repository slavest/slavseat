import { globalStyle } from '@vanilla-extract/css';

import { baseToken, colorToken } from '@/themes/theme.css';

import { width } from './themes/tokens/width';

globalStyle('body, #root', {
  width: baseToken.width['screen-width'],
  height: baseToken.height['screen-height'],
  color: colorToken['text.primary'],
  backgroundColor: colorToken['background.surface'],
  ...baseToken.transition.colors,
});
