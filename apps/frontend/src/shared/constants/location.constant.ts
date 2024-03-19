export const Locations = {
  HOME: '/',
  RESERVE: '/reserve',
  FAVORITE: '/favorite',
  PROFILE: '/profile',
  LOGIN: '/login',
};
export type Locations = (typeof Locations)[keyof typeof Locations];
