import React from 'react';

import { Button } from '@/legacy/Button_Legacy';
import { useUserStore } from '@/shared/stores/userStore';

function Profile() {
  const { user, logout } = useUserStore();

  return (
    <div className="p-4">
      <div className="text-zinc-500 text-sm">
        로그인된 사용자 정보
      </div>
      <div className="inline-block p-4 border-dashed border-2 rounded-md border-zinc-500 space-x-2">
        <pre>
          <code className="text-sm text-wrap">
            {JSON.stringify(user, null, 2)}
          </code>
        </pre>
      </div>
      <Button onClick={logout} className="block">
        로그아웃
      </Button>
    </div>
  );
}

export default Profile;
