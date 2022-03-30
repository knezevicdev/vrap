import { SkipNavigationLink } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { returnBrandConfig } from '../../utils/pageheaders';

import { Header } from 'src/components/Header';
import Footer from 'src/core/Footer';
import AppraisalReviewViewDetail from 'src/modules/appraisal/review';
import Page from 'src/Page';

interface Prop {
  priceId: string;
}

const AppraisalReview: NextPage<Prop> = () => {
  return (
    <Page name="Review Your Appraisal">
      <SkipNavigationLink mainContentId={'main-content'} />
      <Header />
      <Contents id="main-content">
        <AppraisalContainer>
          <ReviewContainer>
            <AppraisalReviewViewDetail />
          </ReviewContainer>
        </AppraisalContainer>
      </Contents>
      <Footer hasOverlay={true} />
    </Page>
  );
};

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
  @media (max-width: 1020px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

const ReviewContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: flex-end;
  margin: 0 10px;
  @media (max-width: 1020px) {
    width: 100%;
    margin: 0;
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

  return {
    props: {
      description: brandConfig.description,
      title: brandConfig.title,
      canonical: brandConfig.canonical,
    },
  };
};

export default observer(AppraisalReview);
