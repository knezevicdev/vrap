import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';

import { IdToken } from 'src/networking/models/Auth';

export interface AuthContextInterface {
  idToken: IdToken;
  handleLogout(): void;
}

export const AuthContext = createContext<AuthContextInterface>({
  idToken: {} as IdToken,
  handleLogout: (): void => console.log('handleLogout'),
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
    const idTokenCookie = Cookie.get('idToken');

    if (idTokenCookie) {
      const decodedToken: IdToken = jwtDecode(idTokenCookie);
      const isAuthenticated = !(new Date() > new Date(decodedToken.exp * 1000));

      if (isAuthenticated) {
        setStatus(AuthStatus.valid);
        setIdToken(decodedToken);
      } else {
        setStatus(AuthStatus.invalid);
        router.push(`/signin?previous=${window.location.pathname}`);
      }
    } else {
      setStatus(AuthStatus.invalid);
      router.push(`/signin?previous=${window.location.pathname}`);
    }
  }, [router]);

  const handleLogout = (): void => {
    const config: Cookie.CookieAttributes = {
      expires: 1,
      sameSite: 'strict',
      secure: true,
    };
    Cookie.remove('accessToken', config);
    Cookie.remove('idToken', config);
    Cookie.remove('refreshToken', config);
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
