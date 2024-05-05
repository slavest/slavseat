import React, { ComponentProps, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HomeIcon } from '@/assets/icons/Home';
import { ProfileIcon } from '@/assets/icons/Profile';
import { ReserveIcon } from '@/assets/icons/Reserve';
import { Locations } from '@/shared/constants/location.constant';
import { cn } from '@/shared/utils/class.util';

function FooterRoot({ children, className, ...rest }: ComponentProps<'footer'>) {
  return (
    <footer className={cn('min-h-[var(--var-footer-height)] border-t', className)} {...rest}>
      <ul className="grid h-full w-full grid-cols-3">{children}</ul>
    </footer>
  );
}

interface FooterButtonProps {
  active?: boolean;
  onClick?: () => void;
}

function FooterButton({ children, active = false, onClick }: PropsWithChildren<FooterButtonProps>) {
  return (
    <li
      className={cn(
        `flex flex-col items-center justify-center gap-1`,
        'rounded-2xl text-xl',
        'cursor-pointer',
        active ? 'bg-neutral-100 text-neutral-950' : 'text-neutral-500',
      )}
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
        <p className="text-[0.6rem] font-semibold leading-[0.8rem]">홈</p>
      </FooterButton>

      <FooterButton
        active={location.pathname === Locations.RESERVE}
        onClick={() => navigate(Locations.RESERVE)}
      >
        <ReserveIcon />
        <p className="text-[0.6rem] font-semibold leading-[0.8rem]">내 예약</p>
      </FooterButton>

      <FooterButton
        active={location.pathname === Locations.PROFILE}
        onClick={() => navigate(Locations.PROFILE)}
      >
        <ProfileIcon />
        <p className="text-[0.6rem] font-semibold leading-[0.8rem]">프로필</p>
      </FooterButton>
    </FooterRoot>
  );
}
