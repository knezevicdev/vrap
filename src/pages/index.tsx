import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Header } from 'src/components/Header';
import { useAppStore } from 'src/context';
import Footer from 'src/core/Footer';
import AppraisalReviewViewDetail from 'src/modules/appraisal/review';
import Page from 'src/Page';

interface Prop {
  priceId: string;
}

const AppraisalReview: NextPage<Prop> = () => {
  const { store } = useAppStore();
  useEffect(() => {
    store.appraisal.init();
  });

  return (
    <Page name="Review Your Appraisal">
      <Header />
      {!store.absmart.loading && (
        <Contents>
          <AppraisalContainer>
            <ReviewContainer>
              <AppraisalReviewViewDetail />
            </ReviewContainer>
          </AppraisalContainer>
        </Contents>
      )}
      <Footer />
    </Page>
  );
};

const Contents = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding-top: 20px;
  min-height: calc(100vh - 130px);
  justify-content: center;
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

AppraisalReview.getInitialProps = async (
  context: NextPageContext
): Promise<Prop> => {
  const { query } = context;
  const priceId = query.priceId as string;
  return { priceId };
};

export default observer(AppraisalReview);
