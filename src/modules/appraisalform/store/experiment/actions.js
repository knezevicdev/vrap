import { ExperimentTypes } from './types';

export function setExperimentAssignments(assignments) {
  return {
    type: ExperimentTypes.SET_ASSIGNMENTS,
    assignments
  };
}

export function setExperiments(experiments) {
  return {
    type: ExperimentTypes.SET_EXPERIMENTS,
    experiments
  };
}

export function setExperimentVariationKeys(variationKeys) {
  return {
    type: ExperimentTypes.SET_EXPERIMENT_VARIATION_KEYS,
    variationKeys
  };
}
