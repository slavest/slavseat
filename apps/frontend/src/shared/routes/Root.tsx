import React, { useState } from 'react';
import { FaBoltLightning } from 'react-icons/fa6';
import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';

import { useInitialize } from '@/shared/hooks/useInitialize';

import { AppFooter } from '../components/AppFooter';
import { Button } from '../components/Button';
import { FloatingDrawer } from '../components/Drawer';
import { Loading } from '../components/Loading';
import { useAppStore } from '../stores/appStore';
import { cn } from '../utils/class.util';

function Root() {
  const { initialized } = useInitialize();
  const { isPWA, deviceOS } = useAppStore();
  const [isOpenShortcut, setIsOpenShortcut] = useState(false);

  const openShortcut = () => setIsOpenShortcut(true);
  const closeShortcut = () => setIsOpenShortcut(false);

  const quickAddReserve = () => {
    toast.info('구현 예정 기능입니다.');
    closeShortcut();
  };

  return (
    <div className="w-screen h-[calc(100dvh)] max-w-[50rem] m-auto flex flex-col overflow-hidden">
      <header className="hidden">Header</header>
      {initialized ? (
        <>
          <main
            className={cn(
              'h-[calc(100%_-_var(--var-footer-height))]',
              {
                'h-[calc(100%_-_var(--var-footer-height)_-_var(--var-footer-padding-bottom))]':
                  deviceOS === 'ios' && isPWA,
              },
            )}
          >
            <Outlet />
          </main>

          <AppFooter onClickPlusButton={openShortcut} />

          <FloatingDrawer
            open={isOpenShortcut}
            onClose={closeShortcut}
          >
            <Button
              variant="tertiary"
              className="flex items-center justify-center gap-x-3"
              onClick={quickAddReserve}
            >
              <FaBoltLightning />
              잔여 좌석 바로 예약하기
            </Button>
          </FloatingDrawer>
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
