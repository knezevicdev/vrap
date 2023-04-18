import { useABSmartly } from '@vroom-web/analytics-integration';
import { autorun } from 'mobx';
import { useEffect, useState } from 'react';

const useIsInExperiment = (experiment: string) => {
  const abSmartly = useABSmartly();

  const [isLoading, setIsLoading] = useState(abSmartly.isLoading);
  const [isInExperiment, setIsInExperiment] = useState(
    abSmartly.isInExperiment(experiment)
  );

  useEffect(() => {
    autorun(() => {
      setIsLoading(abSmartly.isLoading);
      setIsInExperiment(abSmartly.isInExperiment(experiment));
    });
  });

  return { isLoading, isInExperiment };
};

export default useIsInExperiment;
