import React from 'react';
import { HiOutlineLogout } from 'react-icons/hi';

import { Model } from '@slavseat/types';
import { Box, Dropdown, Text } from '@slavseat/ui-core';

import { hideOutline } from '@/shared/styles/global-style.css';

interface ProfileProps {
  user: Model.UserInfo;
}

export function Profile({ user }: ProfileProps) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger className={hideOutline}>
        <Box
          alignItems="center"
          backgroundColor={{
            all: 'sidebar.profile.background.base',
            hover: 'sidebar.profile.background.hover',
          }}
          borderRadius="xl"
          cursor="pointer"
          display="flex"
          gap="2.5"
          paddingX="2.5"
          paddingY="3"
        >
          <Box
            backgroundColor="sidebar.profile.image.background.base"
            borderRadius="xl"
            height="12"
            width="12"
          />
          <Box display="flex" flexDirection="column">
            <Text fontSize="14" fontWeight="medium">
              {user.name}
            </Text>
            <Text color="sidebar.profile." fontSize="12">
              현재 사용중인 좌석이 없습니다.
            </Text>
          </Box>
        </Box>
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
  );
}
