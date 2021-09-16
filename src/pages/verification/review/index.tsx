import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import styled from 'styled-components';

import { Header } from 'src/components/Header';
import VerificationReviewViewDetail from 'src/modules/verification/review';
import TransactionOverview from 'src/modules/verification/transactionoverview';
import Page from 'src/Page';

interface Prop {
  priceId: string;
}

const VerificationReview: NextPage<Prop> = ({ priceId }) => {
  return (
    <Page name={'Sell Verification'} data-qa="SellVerificationContainer">
      <Header />
      <Contents>
        <VerificationContainer>
          <ContentContainer item sm={12} md={8}>
            <VerificationReviewViewDetail priceId={priceId} />
          </ContentContainer>
          <ContentContainer item sm={12} md={4}>
            <TransactionOverview priceId={priceId} />
          </ContentContainer>
        </VerificationContainer>
      </Contents>
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
  @media (max-width: 770px) {
    padding-top: 0;
  }
  @media (max-width: 1280px) {
    width: calc(100% - 100px);
  }
`;

const ContentContainer = styled(Grid)`
  padding: 0 10px;
`;

const VerificationContainer = styled(Grid)`
  display: flex;
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 770px) {
    flex-direction: column-reverse;
  }
`;

VerificationReview.getInitialProps = async (
  context: NextPageContext
): Promise<Prop> => {
  const { query } = context;
  const priceId = query.priceId as string;
  return { priceId };
};

export default observer(VerificationReview);
