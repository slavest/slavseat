import React from 'react';
import { HiCog, HiOutlineLogout } from 'react-icons/hi';

import { Dropdown } from '../Dropdown';
import { ProfileButton } from './components/ProfileButton';
import { dropdownContentStyle, dropdownItemStyle } from './sidebar-profile.css';

interface SidebarProfileProps {
  name: string;
  imageUrl?: string;
  subText?: string;
  onAction?: (action: 'logout' | 'settings') => void;
}

export function SidebarProfile({ name, imageUrl, subText, onAction }: SidebarProfileProps) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <ProfileButton imageUrl={imageUrl} name={name} subText={subText} />
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content align="start" className={dropdownContentStyle}>
          <Dropdown.Item className={dropdownItemStyle()} onClick={() => onAction?.('settings')}>
            <HiCog />
            설정
          </Dropdown.Item>
          <Dropdown.Item
            className={dropdownItemStyle({ color: 'red' })}
            onClick={() => onAction?.('logout')}
          >
            <HiOutlineLogout />
            로그아웃
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
