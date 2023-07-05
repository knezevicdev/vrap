import { SkipNavigationLink } from '@vroom-web/ui-lib';
import { IncomingMessage } from 'http';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import UnifiedVerification from '../../modules/verification';

import Header from 'src/components/Header';
import Footer from 'src/core/Footer';
import Page from 'src/Page';

interface Props {
  ajsUserId: string;
}

const VerificationPage: NextPage<Props> = ({ ajsUserId }) => {
  return (
    <Page name="Verification">
      <SkipNavigationLink mainContentId={'main-content'} />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <PageContent id="main-content">
        <UnifiedVerification ajsUserId={ajsUserId} />
      </PageContent>
      <Footer />
    </Page>
  );
};

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  z-index: 5;
`;

const PageContent = styled.div`
  height: 100%;
  background-color: #f5f5f5;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: ${(props: any): string => props.theme.typography.family.body};
`;

interface Cookie {
  ajs_user_id: string;
}
const parseCookies = (req?: IncomingMessage): Cookie => {
  if (req && req.headers && req.headers.cookie) {
    return Object.fromEntries(
      req.headers.cookie.split('; ').map((v) => v.split(/=(.+)/))
    );
  } else {
    return { ajs_user_id: '' };
  }
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { req } = ctx;
  const cookies = parseCookies(req);

  ctx.res.setHeader('Cache-Control', '');
  return {
    props: {
      title: 'Verification | Vroom',
      ajsUserId: cookies.ajs_user_id || '',
    },
  };
};

export default VerificationPage;
