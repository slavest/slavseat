import React from 'react';
import { HiCog, HiOutlineLogout } from 'react-icons/hi';

import { Model } from '@slavseat/types';
import { Box, Dropdown, Text } from '@slavseat/ui-core';

import { hideOutline } from '@/shared/styles/global-style.css';

interface ProfileProps {
  user?: Model.UserInfo | null;
  subText?: string;
  onLogout?: () => void;
}

export function Profile({ user, subText, onLogout }: ProfileProps) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Box
          alignItems="center"
          as="button"
          backgroundColor={{
            all: 'sidebar.profile.background.base',
            hover: 'sidebar.profile.background.hover',
          }}
          borderRadius="xl"
          cursor="pointer"
          display="flex"
          gap="2.5"
          outline="none"
          paddingX="2.5"
          paddingY="3"
          width="full"
        >
          <Box
            backgroundColor="sidebar.profile.image.background.base"
            borderRadius="xl"
            height="12"
            width="12"
          />
          <Box display="flex" flexDirection="column">
            <Text fontSize="14" fontWeight="medium">
              {user?.name || '불러오는 중 입니다.'}
            </Text>
            <Text color="common.text.sub" fontSize="12">
              {subText}
            </Text>
          </Box>
        </Box>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content align="start">
          <Box display="flex" flexDirection="column" gap="0.5" width="36">
            <Dropdown.Item
              alignItems="center"
              display="flex"
              fontSize="14"
              fontWeight="medium"
              gap="2"
            >
              <HiCog />
              설정
            </Dropdown.Item>
            <Dropdown.Item
              alignItems="center"
              backgroundColor={{ hover: 'common.error.base' }}
              color={{ all: 'common.text.error', hover: 'common.text.error.inverse' }}
              display="flex"
              fontSize="14"
              fontWeight="medium"
              gap="2"
              onClick={onLogout}
            >
              <HiOutlineLogout />
              로그아웃
            </Dropdown.Item>
          </Box>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
