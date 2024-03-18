import { useEffect, useState } from 'react';

import { getAuthedUser } from '@/shared/api/auth';
import { useUserStore } from '@/shared/stores/userStore';

import { useInitializeStyle } from './useInitializeStyle';

export const useInitialize = () => {
  const [initialized, setInitialized] = useState(false);
  const { initialized: styleInitialized } = useInitializeStyle();

  const { setUser } = useUserStore();

  useEffect(() => {
    getAuthedUser()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.error('로그인된 유저 정보를 불러올 수 없습니다.');
        console.error(err);
      })
      .finally(() => {
        setInitialized(true);
      });
  }, [setUser]);

  return { initialized: initialized && styleInitialized };
};
