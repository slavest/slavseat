export const Locations = {
  HOME: '/',
  RESERVE: '/reserve',
  FAVORITE: '/favorite',
  PROFILE: '/profile',
  LOGIN: '/login',
  ADMIN: {
    ROOT: '/admin',
    FACILITY: {
      ROOT: '/admin/facility',
      EDIT: '/admin/facility/edit',
      VIEW: '/admin/facility/view',
    },
    FLOOR: {
      ROOT: '/admin/floor',
      MANAGE: '/admin/floor/manage',
    },
    RESERVE: {
      ROOT: '/admin/reserve',
      MANAGE: '/admin/reserve/manage',
    },
  },
};
export type Locations = (typeof Locations)[keyof typeof Locations];
