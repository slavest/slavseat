import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

import { FavoriteIcon } from '@/assets/icons/Favorite';
import { HomeIcon } from '@/assets/icons/Home';
import { PlusIcon } from '@/assets/icons/Plus';
import { ProfileIcon } from '@/assets/icons/Profile';
import { ReserveIcon } from '@/assets/icons/Reserve';
import Footer from '@/shared/components/Footer';
import { useInitialize } from '@/shared/hooks/useInitialize';

import { Loading } from '../components/Loading';
import { Locations } from '../constants/location.constant';

function AppFooter() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Footer.Root>
      <Footer.Button
        active={location.pathname === Locations.HOME}
        onClick={() => navigate(Locations.HOME)}
      >
        <HomeIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          홈
        </p>
      </Footer.Button>
      <Footer.Button
        active={location.pathname === Locations.RESERVE}
        onClick={() => navigate(Locations.RESERVE)}
      >
        <ReserveIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          예약
        </p>
      </Footer.Button>
      <Footer.Button>
        <article className="text-white bg-green-400 p-2 rounded-full mb-2">
          <PlusIcon />
        </article>
      </Footer.Button>
      <Footer.Button
        active={location.pathname === Locations.FAVORITE}
        onClick={() => navigate(Locations.FAVORITE)}
      >
        <FavoriteIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          즐겨찾기
        </p>
      </Footer.Button>
      <Footer.Button
        active={location.pathname === Locations.PROFILE}
        onClick={() => navigate(Locations.PROFILE)}
      >
        <ProfileIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          프로필
        </p>
      </Footer.Button>
    </Footer.Root>
  );
}

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
