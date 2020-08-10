import { ExperimentSDK } from 'vroom-abtesting-sdk';
import { Experiment } from 'vroom-abtesting-sdk/types';

const experimentSDK = new ExperimentSDK();

export const showDefaultVariant = (
  experimentId: string,
  experiments: Experiment[] | undefined,
  query: any //{ [key: string]: string }
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
    // assignedVariant is currently either 0 (default) or 1 (variant)
    // if we are the default we return true
    // if we are in the variant we return false
    // same as writing experiment.assignedVariant === 0
    return !experiment.assignedVariant;
  }

  return true;
};

export default experimentSDK;
