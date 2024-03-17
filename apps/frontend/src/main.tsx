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

import { Test } from './features/test/routes/Test.tsx';
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
