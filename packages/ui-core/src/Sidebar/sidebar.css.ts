import { baseToken, colorToken } from '@slavseat/ui-themes';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const rootStyle = style({
  background: colorToken['sidebar.background.base'],
});

export const itemStyle = recipe({
  base: {
    flex: baseToken.spacing['3.5'],
    paddingInline: baseToken.spacing['4'],
    paddingBlock: baseToken.spacing['2'],
  },
  variants: {
    active: {
      true: {
        background: colorToken['sidebar.item.active.background.base'],
        selectors: {
          '&:hover': {
            background: colorToken['sidebar.item.active.background.hover'],
          },
        },
      },
      false: {
        background: colorToken['sidebar.item.inactive.background.base'],
        selectors: {
          '&:hover': {
            background: colorToken['sidebar.item.inactive.background.hover'],
          },
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
