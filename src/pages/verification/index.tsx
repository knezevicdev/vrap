import { SkipNavigationLink } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { parseCookies } from '../../modules/verification/shared/Wrapper';
import UnifiedVerification from '../../modules/verification/unified';

import { Header } from 'src/components/Header';
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

export default observer(VerificationPage);
