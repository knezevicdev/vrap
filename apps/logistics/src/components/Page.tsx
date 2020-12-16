import { styled } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';

import Auth, { AuthContext, AuthContextInterface } from './Auth';
import Header from './Header';

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const Content = styled('div')({
  flex: '1 0 auto',
});

interface Props {
  category?: string;
  head?: React.ReactNode;
  name?: string;
  unprotected?: boolean;
}

const Page: React.FC<Props> = ({ children, head, unprotected }) => {
  if (unprotected) {
    return (
      <PageContainer>
        {head && <Head>{head}</Head>}
        <Header />
        <Content>{children}</Content>
      </PageContainer>
    );
  }
  return (
    <Auth>
      <PageContainer>
        {head && <Head>{head}</Head>}
        <AuthContext.Consumer>
          {(context: AuthContextInterface): JSX.Element => {
            const { idToken, handleLogout } = context;
            return <Header idToken={idToken} handleLogout={handleLogout} />;
          }}
        </AuthContext.Consumer>
        <Content>{children}</Content>
      </PageContainer>
    </Auth>
  );
};

export default Page;
