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
    fontWeight: baseToken.fontWeight.bold,
    ...baseToken.fontSize['14'],
  },
  variants: {
    active: {
      true: {
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.05)',
        color: colorToken['common.text.base'],
        fill: colorToken['sidebar.item.icon.section.bold'],
        background: colorToken['sidebar.item.active.background.base'],
        selectors: {
          '&:hover': {
            background: colorToken['sidebar.item.active.background.hover'],
          },
        },
      },
      false: {
        color: colorToken['common.text.sub'],
        fill: 'none',
        stroke: colorToken['sidebar.item.icon.section.linear'],
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

export const sidebarIconStyle = style({
  width: baseToken.width['4'],
  height: baseToken.height['4'],
});
