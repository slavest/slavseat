import { globalStyle, style } from '@vanilla-extract/css';

import { baseToken, colorToken } from '@/themes/theme.css';

globalStyle('body', {
  color: colorToken['text.primary'],
  backgroundColor: colorToken['background.surface'],
  ...baseToken.transition.colors,
});

export const hideScrollBar = style({
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});
