import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AdminFacilityEdit } from '@/features_legacy/admin/routes/AdminFacilityEdit';
import { AdminFacilityView } from '@/features_legacy/admin/routes/AdminFacilityView';
import { AdminFloorManage } from '@/features_legacy/admin/routes/AdminFloorManage';
import { AdminHome } from '@/features_legacy/admin/routes/AdminHome';
import { AdminReserveManage } from '@/features_legacy/admin/routes/AdminReserveManage';
import { AdminReserveStatistics } from '@/features_legacy/admin/routes/AdminReserveStatistics';
import { AdminRoot } from '@/features_legacy/admin/routes/AdminRoot';
import Home from '@/features_legacy/home/routes/Home/desktop';
import Login from '@/features_legacy/login/routes/Login';
import Profile from '@/features_legacy/profile/routes/Profile';
import Reserve from '@/features_legacy/reserve/routes/Reserve';
import Viewer from '@/features_legacy/viewer/routes/Viewer';
import { Locations } from '@/shared/constants/location.constant';
import Root from '@/shared/routes/Root/desktop';
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

export function DesktopRoutes() {
  return <RouterProvider router={router} />;
}
