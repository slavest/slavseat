import React, { useCallback } from 'react';

import clsx from 'clsx';

import { usePopoverContext } from '../context';
import { popoverTriggerStyle } from '../popover.css';

export interface PopoverTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Trigger = ({
  className,
  onClick,
  ...rest
}: PopoverTriggerProps) => {
  const { setAnchorEl, handleOpen } = usePopoverContext();

  const handleClick = useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    (e) => {
      handleOpen();
      onClick?.(e);
    },
    [handleOpen, onClick],
  );

  return (
    <div
      ref={(ref) => setAnchorEl(ref)}
      onClick={handleClick}
      className={clsx(popoverTriggerStyle, className)}
      {...rest}
    />
  );
};

export default Trigger;
