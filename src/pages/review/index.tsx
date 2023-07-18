import { SkipNavigationLink } from '@vroom-web/ui-lib';
import jwt from 'jsonwebtoken';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

import useHandleAppraisalRoutes from '../../modules/appraisal/hooks/useHandleAppraisalRoutes';
import ReviewError from '../../modules/appraisal/review/components/ReviewError';
import { returnBrandConfig } from '../../utils/pageheaders';

import Header from 'src/components/Header';
import Footer from 'src/core/Footer';
import AppraisalReviewViewDetail from 'src/modules/appraisal/review';
import Page from 'src/Page';

const { serverRuntimeConfig } = getConfig();

interface Prop {
  token: string;
}

const AppraisalReview: NextPage<Prop> = ({ token }) => {
  useHandleAppraisalRoutes();

  return (
    <Page name="Review Your Appraisal">
      <SkipNavigationLink mainContentId={'main-content'} />
      <HeaderContainer>
        <Header />
        <ReviewError />
      </HeaderContainer>
      <Contents id="main-content">
        <AppraisalContainer>
          <AppraisalReviewViewDetail token={token} />
        </AppraisalContainer>
      </Contents>
      <Footer hasOverlay={true} />
    </Page>
  );
};

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  z-index: 5;
`;

const Contents = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding-top: 20px;
  min-height: calc(100vh - 130px);
  justify-content: center;
  align-items: center;
  @media (max-width: 420px) {
    margin: 0;
    width: 100%;
  }
  @media (max-width: 1020px) {
    padding-top: 0;
    width: 100%;
  }
`;

const AppraisalContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  justify-content: center;
  padding: 20px 0;
  @media (max-width: 1020px) {
    padding-top: 24px;
    justify-content: center;
  }
`;

interface Props {
  title: string;
  canonical: string;
  description: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  const brandConfig = returnBrandConfig();
  const vin = ctx.query.vin;

  if (!vin || !serverRuntimeConfig.JWT_SECRET_KEY) {
    return {
      notFound: true,
    };
  }

  const token = jwt.sign({ vin }, serverRuntimeConfig.JWT_SECRET_KEY, {
    expiresIn: '10m',
  });
  const requireAuth = ctx.req.url?.includes('/sell/tradeIn-selfService-Review');

  return {
    props: {
      description: brandConfig.description,
      title: brandConfig.title,
      canonical: brandConfig.canonical,
      allowUnauthenticated: !requireAuth,
      token,
    },
  };
};

export default AppraisalReview;
