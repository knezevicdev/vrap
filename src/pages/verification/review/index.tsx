import { observer } from 'mobx-react';
import { NextPage } from 'next';
import React from 'react';

import VerificationReviewViewDetail from 'src/modules/verification/review';
import VerificationWrapper, {
  getInitialProps,
  VerificationPageProps,
} from 'src/modules/verification/shared/Wrapper';

const VerificationReview: NextPage<VerificationPageProps> = ({ priceId }) => {
  return (
    <VerificationWrapper priceId={priceId} step={2}>
      <VerificationReviewViewDetail priceId={priceId} />
    </VerificationWrapper>
  );
};

VerificationReview.getInitialProps = getInitialProps;

export default observer(VerificationReview);
