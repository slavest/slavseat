import React, { useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';

import MicrosoftIcon from '@/assets/MicrosoftIcon.svg';
import { login } from '@/shared/api/auth';
import { Loading } from '@/shared/components/Loading';
import { useInitialize } from '@/shared/hooks/useInitialize';
import { LogoWithoutNameIcon } from '@/shared/icons/LogoWithoutNameIcon';
import { useUserStore } from '@/shared/stores/userStore';

function Login() {
  useInitialize();
  const location = useLocation();
  const [params] = useSearchParams(location.search);
  const { user } = useUserStore();

  const [loading, setLoading] = useState(false);

  if (user !== null) return <Navigate to={params.get('callbackUrl') ?? '/'} />;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <LogoWithoutNameIcon className="mx-auto h-14 w-14" />
          <span className="text-xl font-bold">로그인</span>
        </div>
        <button
          className="flex h-11 w-60 items-center justify-center gap-3 rounded-2xl bg-black text-sm font-medium text-white transition-colors active:bg-neutral-700"
          onClick={() => {
            setLoading(true);
            login('microsoft', params.get('callbackUrl') ?? '/');
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <img alt="ms social icon" className="h-6 w-6" src={MicrosoftIcon} />
              <span>MS 계정으로 계속하기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
