import { isErrorResponse } from '@vroom-web/networking';
import { SkipNavigationLink } from '@vroom-web/ui-lib';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import Header from 'src/components/Header';
import Footer from 'src/core/Footer';
import photoUploadZipCodes from 'src/data/photoUploadZipCodes.json';
import UnifiedVerification from 'src/modules/verification';
import { getOfferDetails } from 'src/networking/request';
import Page from 'src/Page';

const VerificationPage: NextPage<{ forcePhotoUpload: boolean }> = ({
  forcePhotoUpload,
}) => {
  return (
    <Page name="Verification">
      <SkipNavigationLink mainContentId={'main-content'} />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <PageContent id="main-content">
        <UnifiedVerification forcePhotoUpload={forcePhotoUpload} />
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

const invalidResponse = {
  initialEmail: '',
  zip: '',
};

const getInitialEmailAndZip = async (
  priceId: string | string[] | undefined
) => {
  if (!priceId || Array.isArray(priceId)) return invalidResponse;

  const offerDetailsResponse = await getOfferDetails(priceId);
  if (isErrorResponse(offerDetailsResponse)) return invalidResponse;
  const offerDetails = offerDetailsResponse.data.data?.[0];
  if (!offerDetails) return invalidResponse;

  const offerExpirationTime = new Date(offerDetails.Good_Until__c).getTime();
  if (offerExpirationTime < new Date().getTime()) return invalidResponse;

  return {
    initialEmail: offerDetails.user_email,
    zip: offerDetails.zipcode,
  };
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { initialEmail, zip } = await getInitialEmailAndZip(ctx.query.priceId);

  ctx.res.setHeader('Cache-Control', '');
  return {
    props: {
      title: 'Verification | Vroom',
      initialEmail,
      forcePhotoUpload: photoUploadZipCodes.includes(zip),
    },
  };
};

export default VerificationPage;
