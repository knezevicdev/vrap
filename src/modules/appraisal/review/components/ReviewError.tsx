import React from 'react';

import ErrorBanner from '../../../../components/ErrorBanner';
import useAppraisalStore from '../../../../store/appraisalStore';

const ReviewError = () => {
  const reviewError = useAppraisalStore((state) => state.reviewError);

  if (!reviewError) return null;

  return <ErrorBanner errorMessage={reviewError} />;
};

export default ReviewError;
