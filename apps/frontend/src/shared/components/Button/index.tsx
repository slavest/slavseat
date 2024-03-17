import React, { ComponentProps } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary';

type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  disabled?: boolean;
  size?: ButtonSize;
}

export const Button = ({
  variant = 'primary',
  disabled,
  size,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        twMerge(
          'rounded-3xl py-3 px-5 cursor-pointer font-medium',
          className,
        ),
        {
          'bg-green-500 text-white': variant === 'primary',
          'bg-neutral-200 text-black': variant === 'secondary',
          'w-24': size === 'sm',
          'w-60': size === 'md',
          'w-80': size === 'lg',
          'w-full': size === 'full',
        },
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
