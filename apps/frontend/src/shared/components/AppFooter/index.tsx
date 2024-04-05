import React, { ComponentProps, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FavoriteIcon } from '@/assets/icons/Favorite';
import { HomeIcon } from '@/assets/icons/Home';
import { PlusIcon } from '@/assets/icons/Plus';
import { ProfileIcon } from '@/assets/icons/Profile';
import { ReserveIcon } from '@/assets/icons/Reserve';
import { Locations } from '@/shared/constants/location.constant';
import { cn } from '@/shared/utils/class.util';

function FooterRoot({
  children,
  className,
  ...rest
}: ComponentProps<'footer'>) {
  return (
    <footer
      className={cn(
        'min-h-[var(--var-footer-height)] border-t',
        className,
      )}
      {...rest}
    >
      <ul className="w-full h-full grid grid-cols-5">{children}</ul>
    </footer>
  );
}

interface FooterButtonProps {
  active?: boolean;
  onClick?: () => void;
}

function FooterButton({
  children,
  active = false,
  onClick,
}: PropsWithChildren<FooterButtonProps>) {
  return (
    <li
      className={`flex flex-col items-center justify-center gap-1 text-xl rounded-2xl ${
        active
          ? 'bg-neutral-100 text-neutral-950'
          : 'text-neutral-500'
      }`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export function AppFooter() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <FooterRoot>
      <FooterButton
        active={location.pathname === Locations.HOME}
        onClick={() => navigate(Locations.HOME)}
      >
        <HomeIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          홈
        </p>
      </FooterButton>
      <FooterButton
        active={location.pathname === Locations.RESERVE}
        onClick={() => navigate(Locations.RESERVE)}
      >
        <ReserveIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          예약
        </p>
      </FooterButton>
      <FooterButton>
        <article className="text-white bg-green-400 p-2 rounded-full mb-2">
          <PlusIcon />
        </article>
      </FooterButton>
      <FooterButton
        active={location.pathname === Locations.FAVORITE}
        onClick={() => navigate(Locations.FAVORITE)}
      >
        <FavoriteIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          즐겨찾기
        </p>
      </FooterButton>
      <FooterButton
        active={location.pathname === Locations.PROFILE}
        onClick={() => navigate(Locations.PROFILE)}
      >
        <ProfileIcon />
        <p className="text-[0.6rem] leading-[0.8rem] font-semibold">
          프로필
        </p>
      </FooterButton>
    </FooterRoot>
  );
}
