export const conditions = {
  all: {},
  sm: { '@media': '(min-width: 640px)' },
  md: { '@media': '(min-width: 768px)' },
  lg: { '@media': '(min-width: 1024px)' },
  xl: { '@media': '(min-width: 1280px)' },
  '2xl': { '@media': '(min-width: 1536px)' },
  hover: { selector: '&:hover' },
  focus: { selector: '&:focus' },
  active: { selector: '&:active' },
  disabled: { selector: '&:disabled' },
  visited: { selector: '&:visited' },
} as const;
