import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/molecules/Header';

import { Box } from '../../components/atoms/Box';

export function Root() {
  return (
    <Box
      width="screen-width"
      height="screen-height"
      backgroundColor="background.container"
      display="flex"
      flexDirection="column"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Header link="/" />

      <main
        className={`w-full h-[calc(100%_-_3.5rem)] bg-neutral-100`}
      >
        <Outlet />
      </main>
    </Box>
  );
}
