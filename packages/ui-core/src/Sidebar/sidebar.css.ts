import { baseToken, colorToken } from '@slavseat/ui-themes';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const rootStyle = style({
  display: 'flex',
  height: baseToken.height['screen-height'],
  flexDirection: 'column',
  gap: baseToken.spacing['1'],
  background: colorToken['sidebar.background.base'],
});

export const itemStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: baseToken.spacing['3.5'],
    paddingInline: baseToken.spacing['4'],
    paddingBlock: baseToken.spacing['2'],
    borderRadius: baseToken.radius.md,
    cursor: 'pointer',
    fontWeight: baseToken.fontWeight.medium,
    ...baseToken.fontSize['12'],
  },
  variants: {
    active: {
      true: {
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.05)',
        color: colorToken['common.text.base'],
        background: colorToken['sidebar.item.active.background.base'],
        selectors: {
          '&:hover': {
            background: colorToken['sidebar.item.active.background.hover'],
          },
        },
      },
      false: {
        color: colorToken['common.text.sub'],
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
