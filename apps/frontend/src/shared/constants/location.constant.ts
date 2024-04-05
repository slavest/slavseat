export const Locations = {
  HOME: '/',
  RESERVE: '/reserve',
  FAVORITE: '/favorite',
  PROFILE: '/profile',
  LOGIN: '/login',
  ADMIN: {
    ROOT: '/admin',
    FACILITY: {
      ROOT: '/admini/facility',
      EDIT: '/admin/facility/edit',
      VIEW: '/admin/facility/view',
    },
  },
};
export type Locations = (typeof Locations)[keyof typeof Locations];
