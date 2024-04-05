import React from 'react';
import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

import { useInitialize } from '@/shared/hooks/useInitialize';

import { AppFooter } from '../components/AppFooter';
import { Loading } from '../components/Loading';

function Root() {
  const { initialized } = useInitialize();

  return (
    <div className="w-screen h-[calc(100dvh)] max-w-[50rem] m-auto flex flex-col overflow-hidden">
      <header className="hidden">Header</header>
      {initialized ? (
        <>
          <main className="h-[calc(100%_-_var(--var-footer-height)_-_var(--var-footer-padding-bottom))]">
            <Outlet />
          </main>

          <AppFooter />
        </>
      ) : (
        <Loading />
      )}

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default Root;
