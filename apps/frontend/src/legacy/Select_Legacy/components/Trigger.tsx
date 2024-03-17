import React from 'react';

import Popover from '../../../components/molecules/Popover';
import { PopoverTriggerProps } from '../../../components/molecules/Popover/components/Trigger';

export interface SelectTriggerProps extends PopoverTriggerProps {}

const Trigger = (props: SelectTriggerProps) => {
  return <Popover.Trigger {...props} />;
};

export default Trigger;
