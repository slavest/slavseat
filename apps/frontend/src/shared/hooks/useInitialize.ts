import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAuthedUser } from '@/shared/api/auth';
import { useUserStore } from '@/shared/stores/userStore';

import { useInitializeStyle } from './useInitializeStyle';

export const useInitialize = () => {
  const [initialized, setInitialized] = useState(false);
  const { initialized: styleInitialized } = useInitializeStyle();

  const location = useLocation();
  const navigate = useNavigate();

  const { setUser } = useUserStore();

  useEffect(() => {
    getAuthedUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        console.error('로그인된 유저 정보를 불러올 수 없습니다.');
        if (location.pathname !== '/login') navigate('/login');
      })
      .finally(() => {
        setInitialized(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { initialized: initialized && styleInitialized };
};
