import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import styled from 'styled-components';

import VerificationReviewViewDetail from 'src/modules/verification/review';
import TransactionOverview from 'src/modules/verification/transactionoverview';
import Page from 'src/Page';

interface Prop {
  priceId: string;
}

const VerificationReview: NextPage<Prop> = ({ priceId }) => {
  return (
    <Page name={'Sell Verification'} data-qa="SellVerificationContainer">
      <Contents>
        <VerificationContainer>
          <Grid item sm={12} md={8}>
            <VerificationReviewViewDetail priceId={priceId} />
          </Grid>
          <Grid item sm={12} md={4}>
            <TransactionOverview priceId={priceId} />
          </Grid>
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
`;

const VerificationContainer = styled(Grid)`
  display: flex;
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
