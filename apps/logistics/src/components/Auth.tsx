import axios from 'axios';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';

import { IdToken } from 'src/networking/models/Auth';

export interface AuthContextInterface {
  idToken: IdToken;
  handleLogout(): void;
}

export const AuthContext = createContext<AuthContextInterface>({
  idToken: {} as IdToken,
  handleLogout: (): void => console.info('handleLogout'),
});

enum AuthStatus {
  initial,
  invalid,
  valid,
}

interface Props {
  children: React.ReactNode;
}

const Auth: React.FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter();
  const [status, setStatus] = useState(AuthStatus.initial);
  const [idToken, setIdToken] = useState<IdToken | null>(null);

  useEffect(() => {
    const authDataCookie: IdToken | undefined = Cookie.getJSON('authData');

    if (authDataCookie) {
      const isAuthenticated = !(
        new Date() > new Date(authDataCookie.exp * 1000)
      );

      if (isAuthenticated) {
        setStatus(AuthStatus.valid);
        setIdToken(authDataCookie);
      } else {
        setStatus(AuthStatus.invalid);
        router.push(`/signin?previous=${window.location.pathname}`);
      }
    } else {
      setStatus(AuthStatus.invalid);
      router.push(`/signin?previous=${window.location.pathname}`);
    }
  }, [router]);

  const handleLogout = async (): Promise<void> => {
    Cookie.remove('authData');
    await axios.get('/api/signout');
    router.push('/signin');
  };

  if (status === AuthStatus.valid && idToken) {
    return (
      <AuthContext.Provider value={{ idToken, handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  } else {
    return null;
  }
};

export default Auth;
