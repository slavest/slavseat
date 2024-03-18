export const Locations = {
  HOME: '/',
  RESERVE: '/reserve',
  FAVORITE: '/favorite',
  PROFILE: '/profile',
};
export type Locations = (typeof Locations)[keyof typeof Locations];
