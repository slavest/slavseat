import React, { useState } from 'react';

import { Button } from '@/shared/components/Button';
import { useUserStore } from '@/shared/stores/userStore';
import { cn } from '@/shared/utils/class.util';

function Profile() {
  const { user, logout } = useUserStore();
  const [showDebug, setShowDebug] = useState(false);

  return (
    <div className={cn('h-full', 'px-10 py-12', 'flex flex-col justify-between')}>
      <div>
        <p className="text-sm text-zinc-500">로그인된 사용자 정보</p>

        <h2 className={cn('text-2xl font-bold', 'mb-3')}>{user?.name}</h2>

        <Button size="full" variant="secondary" onClick={logout}>
          로그아웃
        </Button>
      </div>

      {showDebug ? (
        <div className="cursor-pointer text-neutral-400" onClick={() => setShowDebug(false)}>
          캐시 테스트 4
        </div>
      ) : (
        <button
          className={cn('h-8 w-20', 'bg-neutral-50 bg-opacity-70')}
          onClick={() => setShowDebug(true)}
        />
      )}
    </div>
  );
}

export default Profile;
