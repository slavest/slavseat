import { COLOR_PALETTE } from '../tokens/color-palette';
import { DARK_COLOR_TOKEN } from './dark.css';

export const LIGHT_COLOR_TOKEN: typeof DARK_COLOR_TOKEN = {
  // background
  'background.surface': COLOR_PALETTE.white,
  'background.primary': COLOR_PALETTE.zinc600,
  'background.primary.hover': COLOR_PALETTE.zinc700,
  'background.container': COLOR_PALETTE.zinc200,

  // text
  'text.primary': COLOR_PALETTE.zinc950,
  'text.primary.wrong': COLOR_PALETTE.red500,

  // button text
  'text.button.primary': COLOR_PALETTE.white,
  'text.button.contained': COLOR_PALETTE.white,
  'text.button.outlined': COLOR_PALETTE.zinc800,
  'text.popover': COLOR_PALETTE.white,
};
