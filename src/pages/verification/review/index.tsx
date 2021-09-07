import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next';
import React from 'react';

import TransactionOverview from 'src/modules/verification/transactionoverview';

interface Prop {
  priceId: string;
}

const VerificationReview: NextPage<Prop> = ({ priceId }) => {
  return (
    <div>
      Revuew page
      <TransactionOverview priceId={priceId} />
    </div>
  );
};

VerificationReview.getInitialProps = async (
  context: NextPageContext
): Promise<Prop> => {
  const { query } = context;
  const priceId = query.priceId as string;
  console.log('price id get initial props ', priceId);
  return { priceId };
};

export default observer(VerificationReview);
