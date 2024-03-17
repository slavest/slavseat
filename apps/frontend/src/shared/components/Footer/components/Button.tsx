import React, { PropsWithChildren } from 'react';

interface FooterButtonProps {
  active?: boolean;
  onClick?: () => void;
}

export function FooterButton({
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
