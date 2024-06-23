import { baseToken, colorToken } from '@slavseat/ui-themes';
import { recipe } from '@vanilla-extract/recipes';

export const triggerStyle = recipe({
  base: {
    borderBottomStyle: 'solid',
    borderBottomWidth: baseToken.spacing['0.5'],
    marginInline: baseToken.spacing['2'],
    paddingInline: baseToken.spacing['2'],
    paddingBlock: baseToken.spacing['4'],
    fontWeight: baseToken.fontWeight.semibold,
    ...baseToken.fontSize['18'],
    ...baseToken.transition.colors,
  },
  variants: {
    active: {
      true: {
        borderBottomColor: colorToken['tab.border.active'],
      },
      false: {
        borderBottomColor: colorToken['tab.border.inactive'],
      },
    },
  },
});
