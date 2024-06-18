import { baseToken, colorToken } from '@slavseat/ui-themes';
import { style } from '@vanilla-extract/css';

export const profileRootStyle = style({
  display: 'flex',
  gap: baseToken.spacing['2.5'],
  alignItems: 'center',
  paddingInline: baseToken.spacing['3'],
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
  width: baseToken.width['12'],
  height: baseToken.height['12'],
  borderRadius: baseToken.radius.xl,
  border: `solid ${baseToken.spacing['0.25']}`,
  borderColor: colorToken['sidebar.profile.image.border'],
});

export const profileNameStyle = style({
  textAlign: 'start',
  fontWeight: baseToken.fontWeight.medium,
  ...baseToken.fontSize['14'],
});
export const profileSubtextStyle = style({
  textAlign: 'start',
  color: colorToken['common.text.sub'],
  ...baseToken.fontSize['10'],
});
