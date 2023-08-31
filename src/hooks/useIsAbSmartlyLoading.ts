import { useABSmartly } from '@vroom-web/analytics-integration';
import { autorun } from 'mobx';
import { useEffect, useState } from 'react';

const useIsAbSmartlyLoading = () => {
  const abSmartly = useABSmartly();

  const [isLoading, setIsLoading] = useState(abSmartly.isLoading);

  useEffect(() => {
    autorun(() => {
      setIsLoading(abSmartly.isLoading);
    });
  });

  return isLoading;
};

export default useIsAbSmartlyLoading;
