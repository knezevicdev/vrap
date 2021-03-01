import { Box, CircularProgress } from '@material-ui/core';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';

import { Groups, IdToken } from 'src/networking/models/Auth';
import { getSignOut } from 'src/networking/Networker';

export const setAuthDataCookie = (data: IdToken): void => {
  const config: Cookie.CookieAttributes = {
    expires: new Date(data.exp * 1000),
    sameSite: 'strict',
  };

  
  if (process.env.NODE_ENV !== 'development') {
    config.secure = true;
  }
  Cookie.set('authData', data, config);
};

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

const Loading = (): JSX.Element => (
  <Box
    display="flex"
    height="100vh"
    justifyContent="center"
    alignItems="center"
  >
    <CircularProgress />
  </Box>
);

interface Props {
  adminRequired?: boolean;
  children: React.ReactNode;
}

const Auth: React.FC<Props> = (props) => {
  const { adminRequired, children } = props;
  const router = useRouter();
  const [status, setStatus] = useState(AuthStatus.initial);
  const [idToken, setIdToken] = useState<IdToken | null>(null);
  const [adminPass, setAdminPass] = useState(adminRequired ? false : true);

  useEffect(() => {
    const authDataCookie: IdToken | undefined = Cookie.getJSON('authData');

    const invalid = (): void => {
      setStatus(AuthStatus.invalid);
      const url =
        window.location.pathname === '/signin'
          ? '/signin'
          : `/signin?previous=${window.location.pathname}`;
      router.push(url);
    };

    if (authDataCookie) {
      const isAuthenticated = !(
        new Date() > new Date(authDataCookie.exp * 1000)
      );

      if (isAuthenticated) {
        setStatus(AuthStatus.valid);
        setIdToken(authDataCookie);
      } else {
        invalid();
      }
    } else {
      invalid();
    }
  }, [router]);

  useEffect(() => {
    if (adminRequired) {
      if (idToken) {
        const isAdmin = idToken['cognito:groups'].includes(
          Groups.LogisticsPortalAdmin
        );
        if (isAdmin) {
          setAdminPass(true);
        } else {
          router.back();
        }
      }
    }
  }, [adminRequired, idToken, router]);

  const handleLogout = async (): Promise<void> => {
    Cookie.remove('authData');
    await getSignOut();
    router.push('/signin');
  };

  if (!adminPass) {
    return <Loading />;
  }

  if (status === AuthStatus.valid && idToken && adminPass) {
    return (
      <AuthContext.Provider value={{ idToken, handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  } else {
    return <Loading />;
  }
};

export default Auth;
