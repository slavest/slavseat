import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';

import { registerSW } from 'virtual:pwa-register';

import { App } from './app/index.tsx';
import './shared/styles/app.css';
import './shared/styles/global-style.css.ts';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> // https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1111169234
  <QueryClientProvider client={queryClient}>
    {/* <RouterProvider router={router} /> */}
    <App />
  </QueryClientProvider>,
  // </React.StrictMode>,
);
