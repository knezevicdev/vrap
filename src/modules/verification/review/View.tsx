import React, { useEffect } from 'react';

import OwnerInfoReview from './components/OwnerInfoReview';
import PayOffInfoReview from './components/PayOffInfoReview';
import PickupInfoReview from './components/PickupInfoReview';
import SellDocumentReview from './components/SellDocumentReview';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
  priceId: string;
}

const VerificationReviewViewDetail: React.FC<Props> = ({
  viewModel,
  priceId,
}) => {
  useEffect(() => {
    viewModel.getVerificationDetail(priceId);
  }, [priceId]);

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
