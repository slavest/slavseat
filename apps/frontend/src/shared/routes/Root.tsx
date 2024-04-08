import React, { useState } from 'react';
import { FaBoltLightning } from 'react-icons/fa6';
import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';

import { useInitialize } from '@/shared/hooks/useInitialize';

import { AppFooter } from '../components/AppFooter';
import { Button } from '../components/Button';
import { FloatingDrawer } from '../components/Drawer';
import { Loading } from '../components/Loading';
import { LogoWithNameIcon } from '../icons/LogoWithNameIcon';
import { useAppStore } from '../stores/appStore';
import { cn } from '../utils/class.util';

function TopContent() {
  return (
    <section
      id="top"
      className="w-full min-h-full flex flex-col items-center justify-center"
    >
      <LogoWithNameIcon />
      <div className="flex items-center gap-x-6">
        <a
          href="#android"
          className="border rounded-lg px-8 py-4 bg-green-600 text-white shadow-sm"
        >
          Android PWA 설치하기
        </a>
        <a
          href="#ios"
          className="border rounded-lg px-8 py-4 bg-neutral-100 shadow-sm"
        >
          ios PWA 설치하기
        </a>
      </div>
    </section>
  );
}

function AndroidGuide() {
  return (
    <section
      id="android"
      className="w-full h-[calc(100dvh)] flex flex-col items-center justify-center gap-y-4"
    >
      안드로이드 환경 PWA 설치 설명
      <a
        href="#top"
        className="border rounded-lg px-8 py-4 bg-neutral-100 shadow-sm"
      >
        돌아가기
      </a>
    </section>
  );
}

function IosGuide() {
  return (
    <section
      id="ios"
      className="w-full h-[calc(100dvh)] flex flex-col items-center justify-center gap-y-4"
    >
      IOS 환경 PWA 설치 설명
      <a
        href="#top"
        className="border rounded-lg px-8 py-4 bg-neutral-100 shadow-sm"
      >
        돌아가기
      </a>
    </section>
  );
}

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
    <div
      className={cn(
        'w-screen h-[calc(100dvh)] flex justify-center',
        'bg-slate-100',
        'xl:gap-x-8',
      )}
    >
      <div
        className={cn(
          'hidden h-full max-h-[calc(100dvh)] overflow-y-auto scroll-smooth',
          'bg-white border-r border-l border-gray-300 shadow-md',
          'xl:block xl:w-[50rem]',
        )}
      >
        <TopContent />

        <AndroidGuide />

        <IosGuide />
      </div>

      <div
        className={cn(
          'w-full h-full max-w-[64rem] flex flex-col overflow-hidden bg-white',
          'xl:min-w-[26.25rem] xl:max-w-[40dvh] xl:shadow-md xl:border-r xl:border-l border-gray-300',
        )}
      >
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
    </div>
  );
}

export default Root;
