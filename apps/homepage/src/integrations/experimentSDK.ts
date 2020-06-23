import { ExperimentSDK } from 'vroom-abtesting-sdk';

import { HomeStore } from 'src/modules/home/store';

const experimentSDK = new ExperimentSDK();

export const getExperimentVariant = (
  experimentId: string,
  store: HomeStore
): boolean => {
  if (!store) {
    return true;
  }
  const forcedExperimentId = `experiment-${experimentId}`;
  const queryIsNotEmpty = Object.keys(store.query).length > 0;

  if (queryIsNotEmpty) {
    const forcedVariant = store.query[forcedExperimentId];
    return !forcedVariant || forcedVariant === '0';
  }

  if (store.experiments) {
    const experiment = store.experiments.find((x) => x.id === experimentId);
    if (!experiment) {
      return true;
    }
    return !experiment.assignedVariant;
  }

  return true;
};

export default experimentSDK;
