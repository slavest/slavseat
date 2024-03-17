import React from 'react';

import Popover from '../../../shared/components/Popover';
import { PopoverTriggerProps } from '../../../shared/components/Popover/components/Trigger';

export interface SelectTriggerProps extends PopoverTriggerProps {}

const Trigger = (props: SelectTriggerProps) => {
  return <Popover.Trigger {...props} />;
};

export default Trigger;
