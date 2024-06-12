export const transition = {
  all: {
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
  },
  colors: {
    transitionProperty:
      'color, background-color, border-color, text-decoration-color, fill, stroke',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
  },
  transform: {
    transitionProperty: 'transform',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
  },
} as const;
