import React from 'react';

import { useDeviceType } from '@slavseat/ui-hooks';

import { DesktopRoutes } from './routes/DesktopRoutes';
import { MobileRoutes } from './routes/MobileRoutes';

export function App() {
  const deviceType = useDeviceType();

  if (deviceType === 'mobile') return <MobileRoutes />;
  if (deviceType === 'desktop') return <DesktopRoutes />;

  return null;
}
