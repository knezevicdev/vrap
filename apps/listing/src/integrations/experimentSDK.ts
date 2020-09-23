/* eslint-disable @typescript-eslint/camelcase */
import { ExperimentSDK } from 'vroom-abtesting-sdk';
import { ExperimentOptions } from 'vroom-abtesting-sdk/experiment-sdk';
import { Experiment, VariantEnum } from 'vroom-abtesting-sdk/types';

const experimentSDK = new ExperimentSDK();

export const showDefaultVariant = (
  experimentId: string,
  experiments: Experiment[] | undefined,
  query: any //{ [key: string]: string }
): boolean => {
  const forcedExperimentId = `experiment-${experimentId}`;
  const queries = Object.keys(query);
  const queryIsNotEmpty = queries.length > 0;

  if (queryIsNotEmpty && queries.includes(forcedExperimentId)) {
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

function getCookie(name: string): string | undefined {
  // Split cookie string and get all individual name=value pairs in an array
  const cookieArr = document.cookie.split(';');
  // Loop through the array elements
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=');

    /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return undefined;
}

export const clientGetAndLogExperiment = async (
  experimentId: string
): Promise<Experiment | undefined> => {
  try {
    const experimentQueryKey = `experiment-${experimentId}`;
    const urlParams = new URLSearchParams(window.location.search);
    const forcedVariant = urlParams.get(experimentQueryKey);
    const forcedVariantInt = forcedVariant ? parseInt(forcedVariant, 10) : NaN;

    const options: ExperimentOptions | undefined =
      forcedVariantInt === 0 || forcedVariantInt === 1
        ? {
            variantOverrides: {
              [experimentId]: forcedVariantInt as VariantEnum,
            },
          }
        : undefined;

    const marketingId = getCookie('uuid') || 'dev-qa';
    const experiment = await experimentSDK.getAndLogExperiment(
      experimentId,
      marketingId,
      undefined,
      options
    );
    return experiment;
  } catch {
    return undefined;
  }
};

export default experimentSDK;
