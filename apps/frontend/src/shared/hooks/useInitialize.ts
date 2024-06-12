import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useInitializeStyle } from '@slavseat/ui-hooks';

import { getAuthedUser } from '@/shared/api/auth';
import { useUserStore } from '@/shared/stores/userStore';

import { useAppStore } from '../stores/appStore';

export const useInitialize = () => {
  const [initialized, setInitialized] = useState(false);
  const { initialized: styleInitialized } = useInitializeStyle();

  const location = useLocation();
  const navigate = useNavigate();

  const { setIsPWA, setDeviceOS } = useAppStore();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) setIsPWA(true);
    else setIsPWA(false);

    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
      setDeviceOS('andorid');
    }

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setDeviceOS('ios');
    }

    getAuthedUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        console.error('로그인된 유저 정보를 불러올 수 없습니다.');
        if (location.pathname !== '/login') navigate(`/login?callbackUrl=${location.pathname}`);
      })
      .finally(() => {
        setInitialized(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { initialized: initialized && styleInitialized };
};
