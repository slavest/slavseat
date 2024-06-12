import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AdminFacilityEdit } from '@/features/admin/routes/AdminFacilityEdit';
import { AdminFacilityView } from '@/features/admin/routes/AdminFacilityView';
import { AdminFloorManage } from '@/features/admin/routes/AdminFloorManage';
import { AdminHome } from '@/features/admin/routes/AdminHome';
import { AdminReserveManage } from '@/features/admin/routes/AdminReserveManage';
import { AdminReserveStatistics } from '@/features/admin/routes/AdminReserveStatistics';
import { AdminRoot } from '@/features/admin/routes/AdminRoot';
import Home from '@/features/home/routes/Home';
import Login from '@/features/login/routes/Login';
import Profile from '@/features/profile/routes/Profile';
import Reserve from '@/features/reserve/routes/Reserve';
import Viewer from '@/features/viewer/routes/Viewer';
import { Locations } from '@/shared/constants/location.constant';
import Root from '@/shared/routes/Root';
import { cn } from '@/shared/utils/class.util';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: Locations.HOME, element: <Home /> },
      { path: Locations.RESERVE, element: <Reserve /> },
      { path: Locations.PROFILE, element: <Profile /> },
    ],
  },
  { path: Locations.LOGIN, element: <Login /> },
  {
    path: Locations.ADMIN.ROOT,
    element: <AdminRoot />,
    children: [
      {
        path: Locations.ADMIN.ROOT,
        element: <AdminHome />,
      },
      {
        path: Locations.ADMIN.FACILITY.EDIT,
        element: <AdminFacilityEdit />,
      },
      {
        path: Locations.ADMIN.FACILITY.VIEW,
        element: <AdminFacilityView />,
      },
      {
        path: Locations.ADMIN.FLOOR.MANAGE,
        element: <AdminFloorManage />,
      },
      {
        path: Locations.ADMIN.RESERVE.MANAGE,
        element: <AdminReserveManage />,
      },
      {
        path: Locations.ADMIN.STATISTICS.RESERVE,
        element: <AdminReserveStatistics />,
      },
    ],
  },
  {
    path: Locations.VIEWER,
    element: (
      <div className={cn('h-[100dvh] w-[100dvw]')}>
        <Viewer />
      </div>
    ),
  },
]);

export function MobileRoutes() {
  return <RouterProvider router={router} />;
}
