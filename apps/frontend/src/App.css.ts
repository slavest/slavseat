import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { baseToken, colorToken } from './themes/theme.css';

export const rootStyle = style({
  width: baseToken.width.full,
  height: baseToken.height.full,
  overflow: 'hidden',
});

export const iconVariant = recipe({
  base: {
    position: 'absolute',
    display: 'block',
    backgroundColor: colorToken['background.primary'],
    borderRadius: baseToken.radius.full,
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    ...baseToken.transition.all,
  },
  variants: {
    focused: {
      false: {
        width: baseToken.width['4'],
        height: baseToken.height['4'],
      },
      true: {
        width: baseToken.width['6'],
        height: baseToken.height['6'],
      },
    },
  },
  defaultVariants: {
    focused: false,
  },
});

export const iconPopoverContentStyle = style({
  padding: baseToken.spacing['1'],
  transform: 'translate(-25%, 0rem)',
});

export const floorImageStyle = style({
  marginBottom: '20rem',
  marginRight: '20rem',
});
