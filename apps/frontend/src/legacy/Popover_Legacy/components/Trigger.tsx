import React from 'react';

import { cn } from '@/shared/utils/class.util';

import { usePopoverContext } from '../context';
import { popoverTriggerStyle } from '../popover.css';

export interface PopoverTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Trigger = ({ className, ...rest }: PopoverTriggerProps) => {
  const { setAnchorEl, handleOpen } = usePopoverContext();

  return (
    <div
      ref={(ref) => setAnchorEl(ref)}
      onClick={handleOpen}
      className={cn(popoverTriggerStyle, className)}
      {...rest}
    />
  );
};

export default Trigger;
