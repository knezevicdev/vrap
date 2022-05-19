import { observer } from 'mobx-react';
import { NextPage } from 'next';
import React from 'react';

import VerificationOwnerViewDetail from 'src/modules/verification/owner';
import VerificationWrapper, {
  getInitialProps,
  VerificationPageProps,
} from 'src/modules/verification/shared/Wrapper';

const VerificationReview: NextPage<VerificationPageProps> = ({ priceId }) => {
  return (
    <VerificationWrapper priceId={priceId} step={0}>
      <VerificationOwnerViewDetail priceId={priceId} />
    </VerificationWrapper>
  );
};

VerificationReview.getInitialProps = getInitialProps;

export default observer(VerificationReview);
