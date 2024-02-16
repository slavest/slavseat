import {
  assignVars,
  createThemeContract,
  keyframes,
  style,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { baseToken, colorToken } from '@/themes/theme.css';

const rightOpenAnimation = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
});

const rightCloseAnimation = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(100%)', display: 'none' },
});

const drawerVars = createThemeContract({
  open: {
    top: null,
    left: null,
    right: null,
    bottom: null,
  },
  close: {
    top: null,
    left: null,
    right: null,
    bottom: null,
  },
});

export const drawerWrapperVariants = recipe({
  base: {
    position: 'fixed',
    boxSizing: 'border-box',
    borderRadius: baseToken.radius.lg,
    // border: `1px solid ${colorToken['background.container']}`,
    padding: baseToken.spacing['4'],
    backgroundColor: colorToken['elevation.surface.overlay'],
    boxShadow: `0px 8px 12px #091E4226, 0px 0px 1px #091E424F`,
  },
  variants: {
    open: {
      true: {
        ...drawerVars.open,
      },
      false: {
        ...drawerVars.close,
      },
    },
    position: {
      right: {
        height: baseToken.height['screen-height'],
        vars: assignVars(drawerVars, {
          open: {
            top: '0',
            right: '0',
            bottom: 'auto',
            left: 'auto',
          },
          close: {
            top: '0',
            right: '-100%',
            bottom: 'auto',
            left: 'auto',
          },
        }),
      },
      bottom: {
        width: baseToken.width['screen-width'],
        vars: assignVars(drawerVars, {
          open: {
            top: 'auto',
            right: 'auto',
            bottom: '0',
            left: 'auto',
          },
          close: {
            top: 'auto',
            right: 'auto',
            bottom: '-100%',
            left: 'auto',
          },
        }),
      },
      left: {
        height: baseToken.height['screen-height'],
        vars: assignVars(drawerVars, {
          open: {
            top: '0',
            right: 'auto',
            bottom: 'auto',
            left: '0',
          },
          close: {
            top: '0',
            right: 'auto',
            bottom: 'auto',
            left: '-100%',
          },
        }),
      },
    },
  },
  defaultVariants: {
    position: 'right',
    open: false,
  },
});

export const drawerInnerStyle = style({
  width: baseToken.width.full,
  height: baseToken.height.full,
  borderRadius: baseToken.radius.lg,
  // border: `1px solid ${colorToken['background.container']}`,
  padding: baseToken.spacing['4'],
  boxSizing: 'border-box',
  backgroundColor: colorToken['elevation.surface.overlay'],
  boxShadow: `0 0 8px 8px ${colorToken['elevation.shadow.overlay']}`,

  selectors: {
    [`${drawerWrapperVariants.classNames.variants.position.right} > &`]:
      {},
  },
});
