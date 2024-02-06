import {
  PopoverContextProvider,
  PopoverProviderProps,
} from '../context';

export interface RootProps extends PopoverProviderProps {}

const Root = (props: RootProps) => {
  return <PopoverContextProvider {...props} />;
};

export default Root;
