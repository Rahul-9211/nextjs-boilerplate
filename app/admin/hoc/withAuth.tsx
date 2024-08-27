import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getFromLocalStorage } from '@/utils/functions/function';
import {  verifyTokenStatus } from '@/utils/api';
import { Tokens } from '@/utils/types';
import { localStorageDataType, localStorageKeys } from '@/utils/types';

const withAuth = (WrappedComponent: React.FC) => {
  const AuthComponent: React.FC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const tokens= getFromLocalStorage<Tokens>(localStorageKeys.TOKENS, localStorageDataType.OBJECT);
        if (tokens && tokens?.accessToken) {
          const isValid = await verifyTokenStatus(tokens?.accessToken);
          if (!isValid) {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
