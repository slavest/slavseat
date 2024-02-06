import Popover from '../../Popover';
import { PopoverTriggerProps } from '../../Popover/components/Trigger';

export interface SelectTriggerProps extends PopoverTriggerProps {}

const Trigger = (props: SelectTriggerProps) => {
  return <Popover.Trigger {...props} />;
};

export default Trigger;
