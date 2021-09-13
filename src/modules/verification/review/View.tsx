import React from 'react';

import OwnerInfoReview from './components/OwnerInfoReview';
import PayOffInfoReview from './components/PayOffInfoReview';
import PickupInfoReview from './components/PickupInfoReview';

const VerificationReviewViewDetail: React.FC = () => {
  return (
    <div>
      <OwnerInfoReview />
      <PickupInfoReview />
      <PayOffInfoReview />
    </div>
  );
};

export default VerificationReviewViewDetail;
