import { isErrorResponse } from '@vroom-web/networking';
import { SkipNavigationLink } from '@vroom-web/ui-lib';
import { ThemeProps } from '@vroom-web/ui-lib/dist/foundation/themes/types';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import Header from 'src/components/Header';
import Footer from 'src/core/Footer';
import UnifiedVerification from 'src/modules/verification';
import { getOfferDetails } from 'src/networking/request';
import Page from 'src/Page';

const VerificationPage: NextPage = () => {
  return (
    <Page name="Verification">
      <SkipNavigationLink mainContentId={'main-content'} />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <PageContent id="main-content">
        <UnifiedVerification />
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
  font-family: ${(props: { theme: ThemeProps }): string =>
    props.theme.typography.family.body};
`;

const getInitialEmailAndZip = async (
  priceId: string | string[] | undefined
) => {
  if (!priceId || Array.isArray(priceId)) return '';

  const offerDetailsResponse = await getOfferDetails(priceId);
  if (isErrorResponse(offerDetailsResponse)) return '';
  const offerDetails = offerDetailsResponse.data.data?.[0];
  if (!offerDetails) return '';

  const offerExpirationTime = new Date(offerDetails.Good_Until__c).getTime();
  if (offerExpirationTime < new Date().getTime()) return '';

  return offerDetails.user_email || '';
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const initialEmail = await getInitialEmailAndZip(ctx.query.priceId);

  ctx.res.setHeader('Cache-Control', '');
  return {
    props: {
      title: 'Verification | Vroom',
      initialEmail,
    },
  };
};

export default VerificationPage;
