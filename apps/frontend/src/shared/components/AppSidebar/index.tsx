import React from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Dropdown, Profile, Sidebar, Text } from '@slavseat/ui-core';
import { sidebarIconStyle } from '@slavseat/ui-core/src/Sidebar/sidebar.css';
import { BoldMapIcon, BoldTicketIcon, LinearMapIcon, LinearTicketIcon } from '@slavseat/ui-icons';

import { useAppStore } from '@/shared/stores/appStore';
import { useUserStore } from '@/shared/stores/userStore';
import { hideOutline } from '@/shared/styles/global-style.css';

export function AppSidebar() {
  const { user } = useUserStore();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box backgroundColor="sidebar.background.base" height="screen-height" paddingY="4">
      <Box paddingX="5">
        {user && (
          <Dropdown.Root>
            <Dropdown.Trigger className={hideOutline}>
              <Profile name={user.name} subtext="현재 사용중인 자리가 없습니다." />
            </Dropdown.Trigger>
            <Dropdown.Portal>
              <Dropdown.Content align="start">
                <Box display="flex" flexDirection="column" gap="0.5" width="36">
                  <Dropdown.Item
                    backgroundColor={{ hover: 'common.error.base' }}
                    color={{ all: 'common.text.error', hover: 'common.text.error.inverse' }}
                    fontSize="14"
                  >
                    <Box alignItems="center" display="flex" gap="2">
                      <HiOutlineLogout />
                      로그아웃
                    </Box>
                  </Dropdown.Item>
                </Box>
              </Dropdown.Content>
            </Dropdown.Portal>
          </Dropdown.Root>
        )}
      </Box>
      <Box paddingX="5">
        <Sidebar.Root location={location.pathname}>
          <Sidebar.Item
            activeIcon={<BoldMapIcon className={sidebarIconStyle} />}
            inactiveIcon={<LinearMapIcon className={sidebarIconStyle} />}
            path="/"
            onClick={() => navigate('/')}
          >
            좌석 배치도
          </Sidebar.Item>
          <Sidebar.Item
            activeIcon={<BoldTicketIcon className={sidebarIconStyle} />}
            inactiveIcon={<LinearTicketIcon className={sidebarIconStyle} />}
            path="/reserve"
            onClick={() => navigate('/reserve')}
          >
            내 예약
          </Sidebar.Item>
        </Sidebar.Root>
      </Box>
    </Box>
  );
}
