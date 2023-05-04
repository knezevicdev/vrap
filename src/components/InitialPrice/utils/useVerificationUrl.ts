import { useMemo } from 'react';

import useIsInExperiment from '../../../hooks/useIsInExperiment';
import { PriceStore } from '../../../modules/price/store';

const useVerificationUrl = (store: PriceStore) => {
  const { isInExperiment: isVerificationRedesignTest } = useIsInExperiment(
    'verification-form-redesign'
  );

  return useMemo(() => {
    if (isVerificationRedesignTest) {
      return `/sell/verification?priceId=${store.price.priceId}`;
    }
    return `/sell/verification/owner/${store.price.priceId}`;
  }, [isVerificationRedesignTest, store.price.priceId]);
};

export default useVerificationUrl;
