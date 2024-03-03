import React from 'react';

import { twMerge } from 'tailwind-merge';

import { usePopoverContext } from '../context';

export interface PopoverTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Trigger = ({ className, ...rest }: PopoverTriggerProps) => {
  const { setAnchorEl, handleOpen } = usePopoverContext();

  return (
    <div
      ref={(ref) => setAnchorEl(ref)}
      onClick={handleOpen}
      className={twMerge(className)}
      {...rest}
    />
  );
};

export default Trigger;
