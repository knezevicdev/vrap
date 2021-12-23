import { ExperimentTypes } from './types';

const INITIAL_STATE = {
  assignments: undefined,
  experiments: undefined,
  variationKeys: {}
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ExperimentTypes.SET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.assignments
      };
    case ExperimentTypes.SET_EXPERIMENTS:
      return {
        ...state,
        experiments: action.experiments
      };
    case ExperimentTypes.SET_EXPERIMENT_VARIATION_KEYS:
      return {
        ...state,
        variationKeys: Object.assign(
          {},
          state.variationKeys,
          action.variationKeys
        )
      };
    default:
      return state;
  }
}
