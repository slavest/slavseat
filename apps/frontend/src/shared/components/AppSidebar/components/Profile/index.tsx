import React from 'react';

import { Model } from '@slavseat/types';
import { Box, Text } from '@slavseat/ui-core';

interface ProfileProps {
  user: Model.UserInfo;
}

export function Profile({ user }: ProfileProps) {
  return (
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
        <Text color="sub" fontSize="10">
          현재 사용중인 좌석이 없습니다.
        </Text>
      </Box>
    </Box>
  );
}
