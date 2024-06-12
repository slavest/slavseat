import { useEffect, useState } from 'react';

const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/Mobile|Android|iP(hone|od|ad)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};
