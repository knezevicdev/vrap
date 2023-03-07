import { observer } from 'mobx-react';
import { NextPage } from 'next';
import React from 'react';

import VerificationOwnerViewDetail from 'src/modules/verification/owner';
import VerificationWrapper, {
  getInitialProps,
  VerificationPageProps,
} from 'src/modules/verification/shared/Wrapper';

const VerificationOwner: NextPage<VerificationPageProps> = ({
  priceId,
  ajsUserId,
}) => {
  return (
    <VerificationWrapper priceId={priceId} step={0}>
      <VerificationOwnerViewDetail priceId={priceId} ajsUserId={ajsUserId} />
    </VerificationWrapper>
  );
};

VerificationOwner.getInitialProps = getInitialProps;

export default observer(VerificationOwner);
