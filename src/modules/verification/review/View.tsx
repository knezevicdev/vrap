import React from 'react';

import OwnerInfoReview from './components/OwnerInfoReview';
import PayOffInfoReview from './components/PayOffInfoReview';
import PickupInfoReview from './components/PickupInfoReview';
import SellDocumentReview from './components/SellDocumentReview';

const VerificationReviewViewDetail: React.FC = () => {
  return (
    <div>
      <OwnerInfoReview />
      <PickupInfoReview />
      <PayOffInfoReview />
      <SellDocumentReview />
    </div>
  );
};

export default VerificationReviewViewDetail;
