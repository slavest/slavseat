import { COLOR_PALETTE } from '../tokens/color-palette';

const COMMON_COLOR_TOKEN = {
  // common
  'common.hover': COLOR_PALETTE.neutral100,
  'common.base': COLOR_PALETTE.transparent,
  'common.primary.base': COLOR_PALETTE.green500,
  'common.primary.press': COLOR_PALETTE.green700,
  'common.primary.hover': COLOR_PALETTE.green600,
  'common.text.base': COLOR_PALETTE.black,
  'common.text.sub': COLOR_PALETTE.neutral400,
};

export const LIGHT_COLOR_TOKEN = {
  ...COMMON_COLOR_TOKEN,

  // sidebar
  'sidebar.background.base': COLOR_PALETTE.neutral50,
  'sidebar.profile.background.base': COMMON_COLOR_TOKEN['common.base'],
  'sidebar.profile.background.hover': COMMON_COLOR_TOKEN['common.hover'],
  'sidebar.profile.image.background.base': COLOR_PALETTE.neutral400,
  'sidebar.profile.image.border': COLOR_PALETTE.neutral200,
  'sidebar.item.active.background.base': COLOR_PALETTE.white,
  'sidebar.item.active.background.hover': COLOR_PALETTE.white,
  'sidebar.item.inactive.background.base': COMMON_COLOR_TOKEN['common.base'],
  'sidebar.item.inactive.background.hover': COMMON_COLOR_TOKEN['common.hover'],
  'sidebar.item.icon.section.bold': COLOR_PALETTE.black,
  'sidebar.item.icon.section.linear': COLOR_PALETTE.neutral400,
};
