import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';

import { cn } from '@slavseat/ui-utils';

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

const Item = React.forwardRef<
  ElementRef<typeof RadixDropdown.Item>,
  ComponentPropsWithoutRef<typeof RadixDropdown.Item>
>(({ className, ...rest }, ref) => (
  <RadixDropdown.Item ref={ref} className={cn(className, itemStyle)} {...rest} />
));
Item.displayName = 'Dropdown.Item';

// const Item = ({ className, ...rest }: ) => (
//   <RadixDropdown.Item className={cn()} />
// );

export const Dropdown = {
  Root,
  Portal,
  Content,
  Trigger,
  Item,
};
