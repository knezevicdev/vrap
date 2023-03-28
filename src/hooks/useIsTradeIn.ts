import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useIsTradeIn = (): boolean => {
  const router = useRouter();

  return useMemo(
    () => router.asPath.includes('/tradeIn-selfService'),
    [router.asPath]
  );
};

export default useIsTradeIn;
