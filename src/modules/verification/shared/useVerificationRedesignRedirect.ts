import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useIsInExperiment from 'src/hooks/useIsInExperiment';

const useVerificationRedesignRedirect = () => {
  const router = useRouter();
  const { isInExperiment } = useIsInExperiment('verification-form-redesign');
  const priceId = router.query.priceId as string;

  useEffect(() => {
    if (isInExperiment) {
      router.push(`/sell/verification?priceId=${priceId}`);
    }
  }, [isInExperiment, priceId, router]);
};

export default useVerificationRedesignRedirect;
