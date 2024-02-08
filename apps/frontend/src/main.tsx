import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import './global-style.css.ts';
import { StyleInitalizer } from './hooks/useInitalizeStyle.ts';
import './reset.css';
import { Booking } from './routes/booking';
import { Main } from './routes/main';
import { Root } from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/booking',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Booking />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyleInitalizer>
      <RouterProvider router={router} />
    </StyleInitalizer>
  </React.StrictMode>,
);
