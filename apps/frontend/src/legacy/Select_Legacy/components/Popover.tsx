import React from 'react';

import clsx from 'clsx';

import PopoverComponent from '../../../shared/components/Popover';
import { PopoverContentProps } from '../../../shared/components/Popover/components/Content';
import { selectPopoverStyles } from '../select.css';

export interface SelectPopoverProps extends PopoverContentProps {}

const Popover = ({ className, ...rest }: SelectPopoverProps) => {
  return (
    <PopoverComponent.Content
      className={clsx(selectPopoverStyles, className)}
      {...rest}
    />
  );
};

export default Popover;
