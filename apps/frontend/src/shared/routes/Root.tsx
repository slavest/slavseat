import React from 'react';
import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

import { useWindowSize } from 'usehooks-ts';

import { useInitialize } from '@/shared/hooks/useInitialize';

import { AppFooter } from '../components/AppFooter';
import { Loading } from '../components/Loading';
import { LogoWithNameIcon } from '../icons/LogoWithNameIcon';
import { useAppStore } from '../stores/appStore';
import { hideScrollBar } from '../styles/global-style.css';
import { cn } from '../utils/class.util';

function TopContent() {
  return (
    <section className="flex min-h-full w-full flex-col items-center justify-center" id="top">
      <LogoWithNameIcon className="h-60 w-60" />
      <div className="flex items-center gap-x-6">
        <a
          className="rounded-lg border bg-green-600 px-8 py-4 text-white shadow-sm"
          href="#android"
        >
          Android PWA 설치하기
        </a>
        <a className="rounded-lg border bg-neutral-100 px-8 py-4 shadow-sm" href="#ios">
          iOS PWA 설치하기
        </a>
      </div>
    </section>
  );
}

function AndroidGuide() {
  return (
    <section
      className="mb-6 flex min-h-[calc(100dvh)] w-full flex-col items-center justify-center gap-y-4 border-b px-4 py-4"
      id="android"
    >
      <h2 className="text-4xl font-bold">Android PWA 가이드</h2>

      <div className="flex flex-col gap-16">
        <section id="ios_step_1">
          <div className="space-y-4">
            <div className="flex gap-4">
              <img alt="Android Step 1" className="w-80" src="/Android_Step_1.PNG" />
              <img alt="Android Step 2" className="w-80" src="/Android_Step_2.PNG" />
            </div>
            <div className="w-full text-center text-2xl text-red-500">
              우상단 메뉴 클릭 {'->'} 홈 화면에 추가
            </div>
          </div>
        </section>

        <div className="space-y-4">
          <div className="flex gap-4">
            <img alt="Android Step 3" className="w-80" src="/Android_Step_3.PNG" />
            <img alt="Android Step 4" className="w-80" src="/Android_Step_4.PNG" />
          </div>
          <div className="w-full text-center text-2xl text-red-500">
            설치 버튼 {'->'} 홈 화면에 Booksy
          </div>
        </div>
      </div>

      <a className="rounded-lg border bg-neutral-100 px-8 py-4 shadow-sm" href="#top">
        돌아가기
      </a>
    </section>
  );
}

function IosGuide() {
  return (
    <section
      className="flex min-h-[calc(100dvh)] w-full flex-col items-center justify-center gap-y-4 px-4 py-4"
      id="ios"
    >
      <h2 className="text-4xl font-bold">iOS PWA 가이드</h2>

      <div className="flex flex-col gap-16">
        <section id="ios_step_1">
          <div className="space-y-4">
            <div className="flex gap-4">
              <img alt="iOS Step 1 Safari" className="w-80" src="/iOS_Step_1_Safari.PNG" />
              <img alt="iOS Step 1 Chrome" className="w-80" src="/iOS_Step_1_Chrome.PNG" />
            </div>
            <div className="w-full text-center text-2xl text-red-500">
              공유 버튼 클릭 (좌: Safari, 우: Chrome)
            </div>
          </div>
        </section>

        <div className="space-y-4">
          <div className="flex gap-4">
            <img alt="iOS Step 2" className="w-80" src="/iOS_Step_2.PNG" />
            <img alt="iOS Step 3" className="w-80" src="/iOS_Step_3.PNG" />
          </div>
          <div className="w-full text-center text-2xl text-red-500">
            {'홈 화면에 추가 -> 우측 상단 "추가"'}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <img alt="iOS Step 4" className="w-80" src="/iOS_Step_4.PNG" />
          </div>
          <div className="w-full text-center text-2xl text-red-500">
            홈 화면에 추가된 Booksy 사용
          </div>
        </div>
      </div>

      <a className="rounded-lg border bg-neutral-100 px-8 py-4 shadow-sm" href="#top">
        돌아가기
      </a>
    </section>
  );
}
function Root() {
  const { initialized } = useInitialize();
  const { isPWA, deviceOS } = useAppStore();
  // const [isOpenShortcut, setIsOpenShortcut] = useState(false);
  const { width } = useWindowSize();

  // const closeShortcut = () => setIsOpenShortcut(false);

  // const quickAddReserve = () => {
  //   toast.info('구현 예정 기능입니다.');
  //   closeShortcut();
  // };

  return (
    <div
      className={cn('flex h-[calc(100dvh)] w-screen justify-center', 'bg-slate-100', 'xl:gap-x-32')}
    >
      <div
        className={cn(
          'hidden h-full max-h-[calc(100dvh)] overflow-y-auto scroll-smooth',
          'xl:block xl:w-[50rem]',
          hideScrollBar,
        )}
      >
        {width >= 1280 && (
          <>
            <TopContent />

            <AndroidGuide />

            <IosGuide />
          </>
        )}
      </div>

      <div
        className={cn(
          'flex h-full w-full max-w-[64rem] flex-col overflow-hidden bg-white',
          'border-gray-300 xl:min-w-[26.25rem] xl:max-w-[40dvh] xl:border-l xl:border-r xl:shadow-blur-sm',
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
            {/* 
            <FloatingDrawer open={isOpenShortcut} onClose={closeShortcut}>
              <Button
                className="flex items-center justify-center gap-x-3"
                variant="tertiary"
                onClick={quickAddReserve}
              >
                <FaBoltLightning />
                잔여 좌석 바로 예약하기
              </Button>
            </FloatingDrawer> */}
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
