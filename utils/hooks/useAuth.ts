import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFromLocalStorage } from '@/utils/functions/function';
import {  verifyTokenStatus } from '@/utils/api';
import { Tokens } from '../types';
import { localStorageDataType, localStorageKeys } from '../types';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const tokens = getFromLocalStorage<Tokens>(localStorageKeys.TOKENS, localStorageDataType.OBJECT);
      if (tokens && tokens?.accessToken) {
        const isValid = await verifyTokenStatus(tokens?.accessToken);
        if (!isValid) {
          router.push('/signin');
        }
      } else {
        router.push('/signin');
      }
    };

    checkAuth();
  }, [router]);
};

export default useAuth;
