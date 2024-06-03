import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { registerSW } from 'virtual:pwa-register';

import { AdminFacilityEdit } from './features/admin/routes/AdminFacilityEdit.tsx';
import { AdminFacilityView } from './features/admin/routes/AdminFacilityView.tsx';
import { AdminFloorManage } from './features/admin/routes/AdminFloorManage.tsx';
import { AdminHome } from './features/admin/routes/AdminHome.tsx';
import { AdminReserveManage } from './features/admin/routes/AdminReserveManage.tsx';
import { AdminReserveStatistics } from './features/admin/routes/AdminReserveStatistics.tsx';
import { AdminRoot } from './features/admin/routes/AdminRoot.tsx';
import Home from './features/home/routes/Home.tsx';
import Login from './features/login/routes/Login.tsx';
import Profile from './features/profile/routes/Profile.tsx';
import Reserve from './features/reserve/routes/Reserve.tsx';
import Viewer from './features/viewer/routes/Viewer.tsx';
import { Locations } from './shared/constants/location.constant.ts';
import Root from './shared/routes/Root.tsx';
import './shared/styles/app.css';
import './shared/styles/global-style.css.ts';
import { cn } from './shared/utils/class.util.ts';

const queryClient = new QueryClient();

const intervalMS = 60 * 1000;

const updateSW = registerSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
});

updateSW();

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> // https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1111169234
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
  // </React.StrictMode>,
);
