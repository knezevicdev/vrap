import { observer } from 'mobx-react';
import { NextPage } from 'next';
import React from 'react';

import VerificationPhotosViewDetail from 'src/modules/verification/photos';
import VerificationWrapper, {
  getInitialProps,
  VerificationPageProps,
} from 'src/modules/verification/shared/Wrapper';

const VerificationPhotos: NextPage<VerificationPageProps> = ({ priceId }) => {
  return (
    <VerificationWrapper priceId={priceId} step={2}>
      <VerificationPhotosViewDetail priceId={priceId} />
    </VerificationWrapper>
  );
};

VerificationPhotos.getInitialProps = getInitialProps;

export default observer(VerificationPhotos);
