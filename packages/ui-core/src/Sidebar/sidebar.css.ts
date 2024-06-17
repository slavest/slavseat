import { baseToken, colorToken } from '@slavseat/ui-themes';
import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const rootStyle = style({
  background: colorToken['sidebar.background.base'],
});

const itemVars = createThemeContract({
  background: null,
})

export const itemStyle = recipe({
  base: {
    flex: baseToken.spacing['3.5'],
    paddingInline: baseToken.spacing['4'],
    paddingBlock: baseToken.spacing['2'],
  },
  variants: {
    active: {
      true: {
        vars: assignVars(itemVars, {
          background:
        })
        background: colorToken['sidebar.item.active.background.base'],
      },
      false: {
        background: colorToken['sidebar.item.inactive.background.base'],
      },
    },
    hover: {
      true: {
        background: colorToken['sidebar.item.active.background.hover']
      },
      false: {
        background: colorToken.
      },
    },
  },
  defaultVariants: {
    active: false,
    hover: false,
  },
});
