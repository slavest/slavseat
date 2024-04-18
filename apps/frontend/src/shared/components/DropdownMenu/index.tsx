import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { cn } from '@/shared/utils/class.util';

const Content = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>
>(({ className, ...rest }, ref) => {
  return (
    <RadixDropdownMenu.Content
      ref={ref}
      className={cn('rounded-lg bg-white p-1 shadow-blur', className)}
      {...rest}
    />
  );
});
Content.displayName = 'DropdownMenu.Content';

const Item = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>
>(({ className, ...rest }, ref) => {
  return (
    <RadixDropdownMenu.Item
      ref={ref}
      className={cn(
        'cursor-pointer rounded-md bg-white px-2 py-1 text-sm outline-none transition-colors hover:bg-violet-600 hover:text-white',
        className,
      )}
      {...rest}
    />
  );
});
Item.displayName = 'DropdownMenu.Item';

export const DropdownMenu = {
  ...RadixDropdownMenu,
  Content,
  Item,
};
