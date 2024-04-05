import Item from './components/Item';
import { ItemGroup } from './components/ItemGroup';
import { SideBarComponent } from './components/SideBar';

export const SideBar = Object.assign(SideBarComponent, {
  Item,
  ItemGroup,
});
