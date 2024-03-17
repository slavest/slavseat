import { useEffect, useState } from 'react';

import { getAuthedUser } from '@/api/auth';
import { useUserStore } from '@/stores/userStore';

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
        alert('로그인된 유저 정보를 불러올 수 없습니다.');
        console.error(err);
      })
      .finally(() => {
        setInitialized(true);
      });
  }, [setUser]);

  return { initialized: initialized && styleInitialized };
};
