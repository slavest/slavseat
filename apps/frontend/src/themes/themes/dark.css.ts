import { COLOR_PALETTE } from '../tokens/color-palette';

export const DARK_COLOR_TOKEN = {
  // background
  'background.surface': COLOR_PALETTE.zinc900,
  'background.primary': COLOR_PALETTE.zinc700,
  'background.primary.hover': COLOR_PALETTE.zinc600,
  'background.container': COLOR_PALETTE.zinc800,

  // border
  'border.input': COLOR_PALETTE.zinc600,

  // elevation
  'elevation.surface': COLOR_PALETTE.zinc900,
  'elevation.surface.sunken': COLOR_PALETTE.zinc950,
  'elevation.surface.overlay': COLOR_PALETTE.zinc800,
  'elevation.surface.rasied': COLOR_PALETTE.zinc900,

  // elevation shadow
  'elevation.shadow.overlay':
    '0px 0px 0px 1px #39424a, 0px 8px 12px #0304045C, 0px 0px 1px 1px #03040480s',
  'elevation.shadow.raised':
    '0px 0px 0px 1px #00000000, 0px 1px 1px #03040480, 0px 0px 1px #03040480',

  // text
  'text.primary': COLOR_PALETTE.white,
  'text.primary.wrong': COLOR_PALETTE.red500,

  // button text
  'text.button.primary': COLOR_PALETTE.white,
  'text.button.contained': COLOR_PALETTE.white,
  'text.button.outlined': COLOR_PALETTE.white,
  'text.popover': COLOR_PALETTE.white,
};
