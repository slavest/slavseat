import { spacing } from './spacing';

export const width = {
  ...spacing,
  auto: 'auto',
  full: '100%',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
  'screen-width': '100vw',
} as const;
