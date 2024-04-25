import React, { ComponentProps } from 'react';

import { cn } from '@/shared/utils/class.util';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({
  variant = 'primary',
  size,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-3 py-3',
        'cursor-pointer rounded-2xl font-medium transition-colors',
        'disabled:cursor-default disabled:opacity-75',
        {
          'bg-primary text-white active:bg-neutral-300 disabled:active:bg-primary':
            variant === 'primary',
          'bg-neutral-200 text-black active:bg-neutral-300 disabled:active:bg-neutral-200':
            variant === 'secondary',
          'bg-[#52525B] text-white active:bg-neutral-300 disabled:active:bg-[#52525B]':
            variant === 'tertiary',
          'w-24': size === 'sm',
          'w-60': size === 'md',
          'w-80': size === 'lg',
          'w-full': size === 'full',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
