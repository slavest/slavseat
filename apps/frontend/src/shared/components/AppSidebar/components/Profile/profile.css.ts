import { baseToken, colorToken } from '@slavseat/ui-themes';
import { style } from '@vanilla-extract/css';

export const profileRootStyle = style({
  display: 'flex',
  gap: baseToken.spacing['2.5'],
  alignItems: 'center',
  paddingInline: baseToken.spacing['4'],
  paddingBlock: baseToken.spacing['2'],
  borderRadius: baseToken.radius.xl,
  selectors: {
    '&:hover': {
      background: colorToken['sidebar.profile.background.hover'],
    },
  },
});

export const profileImageStyle = style({
  background: colorToken['sidebar.profile.image.background.base'],
  width: baseToken.width['14'],
  height: baseToken.height['14'],
  borderRadius: baseToken.radius['2xl'],
  border: `solid ${baseToken.spacing['0.25']}`,
  borderColor: colorToken['sidebar.profile.image.border'],
});

export const profileNameStyle = style({
  textAlign: 'start',
  fontWeight: baseToken.fontWeight.bold,
  ...baseToken.fontSize['16'],
});
export const profileSubtextStyle = style({
  textAlign: 'start',
  fontWeight: baseToken.fontWeight.medium,
  color: colorToken['common.text.sub'],
  ...baseToken.fontSize['12'],
});
