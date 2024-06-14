import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Text } from '@slavseat/ui-core';

import { useAppStore } from '@/shared/stores/appStore';
import { useUserStore } from '@/shared/stores/userStore';

import { Profile } from './components/Profile';

export function AppSidebar() {
  const { user } = useUserStore();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box backgroundColor="sidebar.background.base" height="screen-height" paddingX="5" paddingY="6">
      {user && <Profile user={user} />}
    </Box>
  );
}
