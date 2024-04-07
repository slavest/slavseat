import React, { useEffect, useState } from 'react';

import { Box } from '../components/Box';
import { useAdminAppStore } from '../stores/adminAppStore';

export function AdminReserveManage() {
  const { setTitle } = useAdminAppStore();
  useEffect(() => setTitle('예약 관리'), [setTitle]);

  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="p-4">
      <Box title="날짜 선택">
        <input
          type="date"
          className="text-sm border border-neutral-400 rounded-md p-1"
        />
      </Box>
    </div>
  );
}
