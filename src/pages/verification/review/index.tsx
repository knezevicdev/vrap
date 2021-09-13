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
    <Page name={'Verification Review'}>
      <Contents>
        <TransactionOverview priceId={priceId} />
        <VerificationReviewViewDetail priceId={priceId} />
      </Contents>
    </Page>
  );
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

VerificationReview.getInitialProps = async (
  context: NextPageContext
): Promise<Prop> => {
  const { query } = context;
  const priceId = query.priceId as string;
  return { priceId };
};

export default observer(VerificationReview);
