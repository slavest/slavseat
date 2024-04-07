import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { AdminFacilityEdit } from './features/admin/routes/AdminFacilityEdit.tsx';
import { AdminFacilityView } from './features/admin/routes/AdminFacilityView.tsx';
import { AdminFloorManage } from './features/admin/routes/AdminFloorManage.tsx';
import { AdminHome } from './features/admin/routes/AdminHome.tsx';
import { AdminReserveManage } from './features/admin/routes/AdminReserveManage.tsx';
import { AdminRoot } from './features/admin/routes/AdminRoot.tsx';
import Favorite from './features/favorite/routes/Favorite.tsx';
import Home from './features/home/routes/Home.tsx';
import Login from './features/login/routes/Login.tsx';
import Profile from './features/profile/routes/Profile.tsx';
import Reserve from './features/reserve/routes/Reserve.tsx';
import { Locations } from './shared/constants/location.constant.ts';
import Root from './shared/routes/Root.tsx';
import './shared/styles/global-style.css.ts';
import './shared/styles/reset.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: Locations.HOME, element: <Home /> },
      { path: Locations.RESERVE, element: <Reserve /> },
      { path: Locations.FAVORITE, element: <Favorite /> },
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
