import React from 'react';

import { Button } from '@/shared/components/Button';
import { useUserStore } from '@/shared/stores/userStore';

function Profile() {
  const { user, logout } = useUserStore();

  return (
    <div className="p-4">
      <div className="text-sm text-zinc-500">로그인된 사용자 정보</div>
      {/* <div className="inline-block space-x-2 rounded-md border-2 border-dashed border-zinc-500 p-4">
        <pre>
          <code className="text-wrap text-sm">{JSON.stringify(user, null, 2)}</code>
        </pre>
      </div> */}
      <Button size="sm" variant="secondary" onClick={logout}>
        로그아웃
      </Button>
      <div className="text-neutral-400">캐시 테스트 4</div>
    </div>
  );
}

export default Profile;
