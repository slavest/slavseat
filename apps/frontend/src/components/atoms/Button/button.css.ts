import { recipe } from '@vanilla-extract/recipes';

import { baseToken, colorToken } from '@/themes/theme.css';

export const buttonVariants = recipe({
  base: {
    appearance: 'none',
    cursor: 'pointer',
    ...baseToken.transition.colors,
  },
  variants: {
    variant: {
      outlined: {
        backgroundColor: 'transparent',
        border: `2px solid ${colorToken['background.primary']}`,
        color: colorToken['text.button.outlined'],
        '&:hover:not(:disabled), &:focus:not(:disabled)': {
          backgroundColor: colorToken['background.primary.hover'],
          borderColor: colorToken['background.primary.hover'],
          color: colorToken['text.button.contained'],
        },
      },
      contained: {
        backgroundColor: colorToken['background.primary'],
        border: `2px solid ${colorToken['background.primary']}`,
        color: colorToken['text.button.contained'],
        '&:hover:not(:disabled), &:focus:not(:disabled)': {
          backgroundColor: colorToken['background.primary.hover'],
          borderColor: colorToken['background.primary.hover'],
        },
      },
    },
    disabled: {
      false: {},
      true: {
        opacity: baseToken.opacity.disabled,
        cursor: 'not-allowed',
      },
    },
    size: {
      sm: {
        borderRadius: baseToken.radius.md,
        paddingBlock: baseToken.spacing['1'],
        paddingInline: baseToken.spacing['1.5'],
      },
      md: {
        borderRadius: baseToken.radius.md,
        paddingBlock: baseToken.spacing['2'],
        paddingInline: baseToken.spacing['2.5'],
      },
      lg: {
        borderRadius: baseToken.radius.md,
        paddingBlock: baseToken.spacing['2.5'],
        paddingInline: baseToken.spacing['4'],
      },
    },
  },
  defaultVariants: {
    variant: 'contained',
    disabled: false,
    size: 'md',
  },
});
