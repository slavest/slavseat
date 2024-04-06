import React, { useState } from 'react';
import {
  Navigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import MicrosoftIcon from '@/assets/MicrosoftIcon.svg';
import { login } from '@/shared/api/auth';
import { Loading } from '@/shared/components/Loading';
import { useInitialize } from '@/shared/hooks/useInitialize';
import { useUserStore } from '@/shared/stores/userStore';

function Login() {
  useInitialize();
  const location = useLocation();
  const [params] = useSearchParams(location.search);
  const { user } = useUserStore();

  const [loading, setLoading] = useState(false);

  if (user !== null)
    return <Navigate to={params.get('callbackUrl') ?? '/'} />;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <span className="text-xl font-bold">로그인</span>
        <button
          className="flex justify-center items-center gap-3 w-60 h-11 rounded-2xl text-sm font-medium bg-black text-white active:bg-neutral-700 transition-colors"
          onClick={() => {
            setLoading(true);
            login('microsoft', params.get('callbackUrl') ?? '/');
          }}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <img
                src={MicrosoftIcon}
                className="w-6 h-6"
                alt="ms social icon"
              />
              <span>MS 계정으로 계속하기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
