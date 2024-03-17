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

import { Locations } from './constants/location.constant.ts';
import './global-style.css.ts';
import './reset.css';
import Favorite from './routes/Favorite.tsx';
import Home from './routes/Home.tsx';
import Login from './routes/Login.tsx';
import Profile from './routes/Profile.tsx';
import Reserve from './routes/Reserve.tsx';
import Root from './routes/Root.tsx';
import { Test } from './routes/Test.tsx';

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
  { path: '/login', element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
