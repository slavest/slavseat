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

import Favorite from './features/favorite/routes/Favorite.tsx';
import Home from './features/home/routes/Home.tsx';
import Login from './features/login/routes/Login.tsx';
import Profile from './features/profile/routes/Profile.tsx';
import Reserve from './features/reserve/routes/Reserve.tsx';
import { Test } from './features/test/routes/Test.tsx';
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
      {
        path: '/test',
        element: <Test />,
      },
      { path: Locations.HOME, element: <Home /> },
      { path: Locations.RESERVE, element: <Reserve /> },
      { path: Locations.FAVORITE, element: <Favorite /> },
      { path: Locations.PROFILE, element: <Profile /> },
    ],
  },
  { path: Locations.LOGIN, element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
