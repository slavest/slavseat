import React from 'react';

import { Box } from '@slavseat/ui-core';

interface AppHeaderProps {
  title: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <Box fontSize="26" fontWeight="bold" paddingBottom="2" paddingTop="6" paddingX="8" width="full">
      {title}
    </Box>
  );
}
