import React, { useEffect } from 'react';

import { useUserStore } from '@/shared/stores/userStore';
import { cn } from '@/shared/utils/class.util';

import { Box } from '../components/Box';
import { useAdminAppStore } from '../stores/adminAppStore';

export function AdminHome() {
  const { setTitle } = useAdminAppStore();
  const { user } = useUserStore();

  useEffect(() => setTitle('Admin'), [setTitle]);

  return (
    <div className={cn('h-full p-2 space-y-4')}>
      <Box title="로그인된 사용자 정보">
        <pre>
          <code className="text-sm">
            {JSON.stringify(user, null, 2)}
          </code>
        </pre>
      </Box>
    </div>
  );
}
