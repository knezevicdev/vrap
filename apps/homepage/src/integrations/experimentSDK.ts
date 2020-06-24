import { ExperimentSDK } from 'vroom-abtesting-sdk';
import { Experiment } from 'vroom-abtesting-sdk/types';

const experimentSDK = new ExperimentSDK();

export const getExperimentVariant = (
  experimentId: string,
  experiments: Experiment[] | undefined,
  query: { [key: string]: string }
): boolean => {
  const forcedExperimentId = `experiment-${experimentId}`;
  const queryIsNotEmpty = Object.keys(query).length > 0;

  if (queryIsNotEmpty) {
    const forcedVariant = query[forcedExperimentId];
    return !forcedVariant || forcedVariant === '0';
  }

  if (experiments) {
    const experiment = experiments.find(
      (experiment) => experiment.id === experimentId
    );
    if (!experiment) {
      return true;
    }
    return !experiment.assignedVariant;
  }

  return true;
};

export default experimentSDK;
