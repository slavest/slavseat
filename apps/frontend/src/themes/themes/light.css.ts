import { COLOR_PALETTE } from '../tokens/color-palette';
import { DARK_COLOR_TOKEN } from './dark.css';

export const LIGHT_COLOR_TOKEN: typeof DARK_COLOR_TOKEN = {
  // background
  'background.surface': COLOR_PALETTE.white,
  'background.primary': COLOR_PALETTE.zinc600,
  'background.primary.hover': COLOR_PALETTE.zinc700,
  'background.container': COLOR_PALETTE.zinc200,

  // border
  'border.input': COLOR_PALETTE.zinc200,

  // elevation
  'elevation.surface': COLOR_PALETTE.white,
  'elevation.surface.sunken': COLOR_PALETTE.zinc200,
  'elevation.surface.overlay': COLOR_PALETTE.white,
  'elevation.surface.rasied': COLOR_PALETTE.white,

  // elevation shadow
  'elevation.shadow.overlay':
    '0px 8px 12px #091E4226, 0px 0px 1px #091E424F',
  'elevation.shadow.raised':
    '0px 1px 1px #091E4240, 0px 0px 1px #091E424F',

  // text
  'text.primary': COLOR_PALETTE.zinc950,
  'text.primary.wrong': COLOR_PALETTE.red500,

  // button text
  'text.button.primary': COLOR_PALETTE.white,
  'text.button.contained': COLOR_PALETTE.white,
  'text.button.outlined': COLOR_PALETTE.zinc800,
  'text.popover': COLOR_PALETTE.white,
};
