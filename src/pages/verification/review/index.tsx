import { useABSmartly } from '@vroom-web/analytics-integration';
import { observer } from 'mobx-react';
import { NextPage } from 'next';
import React from 'react';

import VerificationReviewViewDetail from 'src/modules/verification/review';
import VerificationWrapper, {
  getInitialProps,
  VerificationPageProps,
} from 'src/modules/verification/shared/Wrapper';

const VerificationReview: NextPage<VerificationPageProps> = ({ priceId }) => {
  const absmartly = useABSmartly();

  const isPhotosUploadExp = absmartly.isInExperiment(
    'verification-form-vehicle-photo-upload'
  );

  return (
    <VerificationWrapper priceId={priceId} step={isPhotosUploadExp ? 3 : 2}>
      <VerificationReviewViewDetail priceId={priceId} />
    </VerificationWrapper>
  );
};

VerificationReview.getInitialProps = getInitialProps;

export default observer(VerificationReview);
