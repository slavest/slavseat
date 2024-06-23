import React from 'react';

import { Box, Tab } from '@slavseat/ui-core';

import { AppHeader } from '@/widget/AppHeader';

function Home() {
  return (
    <Box>
      <AppHeader title="좌석 배치도" />
      <Tab.Root defaultOpenId="test">
        <Box borderBottomWidth="0.5" borderColor="tab.border.base" paddingX="4">
          <Tab.Trigger id="test">1층</Tab.Trigger>
          <Tab.Trigger id="test2">2층</Tab.Trigger>
        </Box>
        <Box>
          <Tab.Content id="test">Tab1Content</Tab.Content>
          <Tab.Content id="test2">Tab2Content</Tab.Content>
        </Box>
      </Tab.Root>
    </Box>
  );
}

export default Home;
