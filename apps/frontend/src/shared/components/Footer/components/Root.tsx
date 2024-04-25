import React, { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

export function FooterRoot({ children, className, ...rest }: ComponentProps<'footer'>) {
  return (
    <footer className={twMerge('min-h-[var(--var-footer-height)] border-t', className)} {...rest}>
      <ul className="grid h-full w-full grid-cols-5">{children}</ul>
    </footer>
  );
}
