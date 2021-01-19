import Box from '@material-ui/core/Box';
import Head from 'next/head';
import React from 'react';

import Auth, { AuthContext, AuthContextInterface } from './Auth';
import Header from './Header';

interface Props {
  category?: string;
  head?: React.ReactNode;
  name: string;
  unprotected?: boolean;
}

const Page: React.FC<Props> = ({ children, head, unprotected, name }) => {
  if (unprotected) {
    return (
      <Box height="100vh" flexDirection="column">
        {head && <Head>{head}</Head>}
        <Header title={name} />
        <Box flex="1 0 auto">{children}</Box>
      </Box>
    );
  }
  return (
    <Auth>
      <Box height="100vh" flexDirection="column">
        {head && <Head>{head}</Head>}
        <AuthContext.Consumer>
          {(context: AuthContextInterface): JSX.Element => {
            const { idToken, handleLogout } = context;
            return (
              <Header
                title={name}
                idToken={idToken}
                handleLogout={handleLogout}
              />
            );
          }}
        </AuthContext.Consumer>
        <Box flex="1 0 auto">{children}</Box>
      </Box>
    </Auth>
  );
};

export default Page;
