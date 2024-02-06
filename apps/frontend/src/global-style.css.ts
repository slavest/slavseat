import { globalStyle } from '@vanilla-extract/css';

import { baseToken, colorToken } from '@/themes/theme.css';

globalStyle('body', {
  color: colorToken['text.primary'],
  backgroundColor: colorToken['background.surface'],
  ...baseToken.transition.colors,
});
