import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';

import { cn } from '@slavseat/ui-utils';

import { Box, BoxProps } from '../Box';
import { contentStyle, itemStyle } from './dropdown.css';

const Root = RadixDropdown.Root;

const Portal = RadixDropdown.Portal;

const Trigger = RadixDropdown.Trigger;

const Content = React.forwardRef<
  ElementRef<typeof RadixDropdown.Content>,
  ComponentPropsWithoutRef<typeof RadixDropdown.Content>
>(({ className, ...rest }, ref) => {
  return <RadixDropdown.Content ref={ref} className={cn(contentStyle, className)} {...rest} />;
});
Content.displayName = 'Dropdown.Content';

const Item = ({ backgroundColor, ...rest }: BoxProps<'button'>) => (
  <Box
    backgroundColor={
      backgroundColor || {
        all: 'dropdown.item.background.base',
        hover: 'dropdown.item.background.hover',
      }
    }
    borderRadius="md"
    cursor="pointer"
    outline="none"
    paddingX="2"
    paddingY="1.5"
    {...rest}
  />
);

export const Dropdown = {
  Root,
  Portal,
  Content,
  Trigger,
  Item,
};
