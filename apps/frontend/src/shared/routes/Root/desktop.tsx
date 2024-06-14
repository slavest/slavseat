import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@slavseat/ui-core';

import { AppSidebar } from '@/shared/components/AppSidebar';
import { Loading } from '@/shared/components/Loading';
import { useInitialize } from '@/shared/hooks/useInitialize';

function Root() {
  const { initialized } = useInitialize();

  if (initialized === false)
    return (
      <Box height="screen-height" width="screen-width">
        <Loading />
      </Box>
    );

  return (
    <Box display="flex" height="screen-height" width="screen-width">
      <AppSidebar />
      <Box flex="full">
        <Outlet />
      </Box>
    </Box>
  );
}

export default Root;
