import { observer } from 'mobx-react';
import { NextPage } from 'next';
import React from 'react';

import VerificationDocumentsViewDetail from 'src/modules/verification/documents';
import VerificationWrapper, {
  getInitialProps,
  VerificationPageProps,
} from 'src/modules/verification/shared/Wrapper';

const VerificationDocuments: NextPage<VerificationPageProps> = ({
  priceId,
}) => {
  return (
    <VerificationWrapper priceId={priceId} step={1}>
      <VerificationDocumentsViewDetail priceId={priceId} />
    </VerificationWrapper>
  );
};

VerificationDocuments.getInitialProps = getInitialProps;

export default observer(VerificationDocuments);
