import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Sidebar, SidebarProfile } from '@slavseat/ui-core';
import { sidebarIconStyle } from '@slavseat/ui-core/src/Sidebar/sidebar.css';
import { BoldMapIcon, BoldTicketIcon, LinearMapIcon, LinearTicketIcon } from '@slavseat/ui-icons';

import { useUserStore } from '@/shared/stores/userStore';

export function AppSidebar() {
  const { user, logout } = useUserStore();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box backgroundColor="sidebar.background.base" height="screen-height" paddingY="4" width="72">
      <Box paddingX="5">
        <SidebarProfile name={user?.name || '...'} subText="현재 사용중인 좌석이 없습니다." />
      </Box>
      <Box paddingX="5" paddingY="4">
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
