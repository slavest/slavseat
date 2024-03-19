import React from 'react';
import { Outlet } from 'react-router-dom';

import { FavoriteIcon } from '@/assets/icons/Favorite';
import { HomeIcon } from '@/assets/icons/Home';
import { PlusIcon } from '@/assets/icons/Plus';
import { ProfileIcon } from '@/assets/icons/Profile';
import { ReserveIcon } from '@/assets/icons/Reserve';
import Footer from '@/shared/components/Footer';
import { useInitialize } from '@/shared/hooks/useInitialize';

import { useInitializeStyle } from '../hooks/useInitializeStyle';

function AppFooter() {
  return (
    <Footer.Root>
      <Footer.Button active>
        <HomeIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          홈
        </p>
      </Footer.Button>
      <Footer.Button>
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
      <Footer.Button>
        <FavoriteIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          즐겨찾기
        </p>
      </Footer.Button>
      <Footer.Button>
        <ProfileIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          프로필
        </p>
      </Footer.Button>
    </Footer.Root>
  );
}

function Root() {
  useInitialize();

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <header className="hidden">Header</header>
      <main className="w-full h-[calc(100%_-_var(--var-footer-height))] flex flex-col shadow-inner bg-neutral-100">
        <Outlet />
      </main>

      <AppFooter />
    </div>
  );
}

export default Root;
