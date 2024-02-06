import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { baseToken, colorToken } from '@/themes/theme.css';

export const selectPopoverStyles = style({
  padding: baseToken.spacing['1'],
});

export const selectItemIconVariants = recipe({
  variants: {
    visible: {
      false: {
        visibility: 'hidden',
      },
      true: {
        visibility: 'visible',
      },
    },
  },
});

export const selectItemVariants = recipe({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: baseToken.spacing['1'],
    paddingInline: baseToken.spacing['1.5'],
    paddingBlock: baseToken.spacing['1'],
    minWidth: baseToken.width[12],
    borderRadius: baseToken.radius.xs,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colorToken['background.primary.hover'],
    },
    ...baseToken.transition.colors,
    ...baseToken.fontSize[14],
  },
  variants: {
    disabled: {
      false: {},
      true: {
        opacity: 0.3,
        cursor: 'not-allowed',
        ':hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});
