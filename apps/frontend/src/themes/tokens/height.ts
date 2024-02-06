import { spacing } from './spacing';

export const height = {
  ...spacing,
  auto: 'auto',
  full: '100%',
  min: 'min-content',
  max: 'max-content',
  fit: 'fit-content',
  'screen-height': '100vh',
} as const;
