import { baseToken, colorToken } from '@slavseat/ui-themes';
import { style } from '@vanilla-extract/css';

export const contentStyle = style({
  background: colorToken['dropdown.background.base'],
  borderRadius: baseToken.radius.lg,
  padding: baseToken.spacing['1.5'],
  boxShadow: '0 4px 24px 0px rgba(0,0,0,0.15)',
  ...baseToken.fontSize[12],
});

export const itemStyle = style({
  background: colorToken['dropdown.item.background.base'],
  borderRadius: baseToken.radius.md,
  outline: 'none',
  paddingInline: baseToken.spacing['2'],
  paddingBlock: baseToken.spacing['1.5'],
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      background: colorToken['dropdown.item.background.hover'],
    },
  },
});
