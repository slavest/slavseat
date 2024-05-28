import React from 'react';
import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

import { useWindowSize } from 'usehooks-ts';

import { useInitialize } from '@/shared/hooks/useInitialize';

import { AppFooter } from '../components/AppFooter';
import { Loading } from '../components/Loading';
import { useAppStore } from '../stores/appStore';
import { cn } from '../utils/class.util';

function Root() {
  const { initialized } = useInitialize();
  const { isPWA, deviceOS } = useAppStore();

  const { width } = useWindowSize();

  return (
    <div
      className={cn('flex h-[calc(100dvh)] w-screen justify-center', 'bg-slate-100', 'xl:gap-x-32')}
    >
      <div
        className={cn(
          'flex h-full w-full flex-col overflow-hidden bg-white',
          'border-gray-300 xl:border-l xl:border-r xl:shadow-blur-sm',
          { 'max-w-[85dvw]': width > 1024 },
        )}
      >
        <header className="hidden">Header</header>
        {initialized ? (
          <>
            <main
              className={cn('h-[calc(100%_-_var(--var-footer-height))]', {
                'h-[calc(100%_-_var(--var-footer-height)_-_var(--var-footer-padding-bottom))]':
                  deviceOS === 'ios' && isPWA,
              })}
            >
              <Outlet />
            </main>

            <AppFooter />
          </>
        ) : (
          <Loading />
        )}

        <ToastContainer
          closeOnClick
          draggable
          hideProgressBar
          pauseOnFocusLoss
          autoClose={1500}
          newestOnTop={false}
          pauseOnHover={false}
          position="top-center"
          rtl={false}
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
}

export default Root;
