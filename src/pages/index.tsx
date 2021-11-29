import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
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
  const [hasData, setHasData] = useState(false);
  useEffect(() => {
    setHasData(store.appraisal.init());
  }, [store.appraisal]);
  useEffect(() => {
    if (!hasData) {
      const timeout = setTimeout(() => {
        window.location.href = '/sell/vehicleInformation';
      }, 5000);
      return clearTimeout(timeout);
    }
  });

  return (
    <Page name="Review Your Appraisal">
      <Header />
      {!store.absmart.loading && (
        <Contents>
          <AppraisalContainer>
            <ReviewContainer>
              {hasData ? (
                <AppraisalReviewViewDetail />
              ) : (
                <Container>
                  <p>
                    No data found, if you are not automatically redirected in 5
                    seconds please use the link below to go back to appraisal
                    form.
                  </p>
                  <p>
                    <a href="/sell/vehicleInformation">Appraisal Form Link</a>
                  </p>
                </Container>
              )}
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  max-width: 780px;
  padding: 0 24px 30px 24px;
  border: solid 1px #d6d7da;
  margin-bottom: 20px;
  @media (max-width: 1020px) {
    max-width: 100%;
    padding: 30px 24px;
    margin: 0 10px;
  }

  @media (max-width: 720px) {
    margin: 0;
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
