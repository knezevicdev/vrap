import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next';
import React from 'react';

import VerificationReviewViewDetail from 'src/modules/verification/review';
import TransactionOverview from 'src/modules/verification/transactionoverview';

interface Prop {
  priceId: string;
}

const VerificationReview: NextPage<Prop> = ({ priceId }) => {
  return (
    <div>
      <TransactionOverview priceId={priceId} />
      <VerificationReviewViewDetail priceId={priceId} />
    </div>
  );
};

VerificationReview.getInitialProps = async (
  context: NextPageContext
): Promise<Prop> => {
  const { query } = context;
  const priceId = query.priceId as string;
  return { priceId };
};

export default observer(VerificationReview);
