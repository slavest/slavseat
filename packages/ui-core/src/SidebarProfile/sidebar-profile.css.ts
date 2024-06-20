import { baseToken, colorToken } from '@slavseat/ui-themes';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const dropdownContentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: baseToken.spacing['0.5'],
  width: baseToken.width['36'],
});

export const dropdownItemStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: baseToken.spacing['2'],
    fontWeight: baseToken.fontWeight.medium,
    ...baseToken.fontSize[14],
  },
  variants: {
    color: {
      red: {
        color: colorToken['common.text.error'],
      },
    },
  },
  defaultVariants: {
    color: undefined,
  },
});
