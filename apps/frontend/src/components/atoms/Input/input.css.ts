import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { baseToken, colorToken } from '@/themes/theme.css';

export const inputWrapperVariants = recipe({
  base: {
    display: 'block',
  },
  variants: {},
});

export const inputLabelStyle = style({
  color: colorToken['text.primary'],
  ...baseToken.fontSize[12],
});

export const inputStyle = style({
  backgroundColor: 'inherit',
  color: colorToken['text.primary'],
  borderWidth: baseToken.spacing[0.5],
  borderStyle: 'solid',
  borderColor: colorToken['border.input'],
  padding: baseToken.spacing[1],
  borderRadius: baseToken.radius.sm,
  width: baseToken.width.full,
  height: baseToken.height.full,
  boxSizing: 'border-box',
});
