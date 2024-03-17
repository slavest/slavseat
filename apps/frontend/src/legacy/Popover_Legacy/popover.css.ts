import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { baseToken, colorToken } from '@/themes/theme.css';

export const popoverTriggerStyle = style({
  display: 'inline-block',
});

export const popoverVariants = recipe({
  base: {
    position: 'absolute',
    backgroundColor: colorToken['background.primary'],
    borderRadius: baseToken.radius.sm,
    marginTop: baseToken.spacing[1],
    color: colorToken['text.popover'],
  },
  variants: {
    open: {
      false: {
        display: 'none',
      },
      true: {
        display: 'block',
      },
    },
  },
});
