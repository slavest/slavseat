import React, { useEffect } from 'react';

import { RecentDailyReserveChart } from '../components/Chart/RecentDailyReserveChart';
import { useAdminAppStore } from '../stores/adminAppStore';

export function AdminReserveStatistics() {
  const { setTitle } = useAdminAppStore();

  useEffect(() => setTitle('예약 통계'), [setTitle]);

  return (
    <div className="h-[calc(100vh_-_var(--var-admin-header-height))] w-full">
      <div className="h-[80%]">
        <RecentDailyReserveChart />
      </div>
    </div>
  );
}
