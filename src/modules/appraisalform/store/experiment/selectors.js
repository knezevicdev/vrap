function experimentState(state) {
  return state.experiment || {};
}

export function selectExperiments(state) {
  return experimentState(state).experiments || {};
}

export function selectExperiment(state, experimentId) {
  const experiments = selectExperiments(state);
  return experiments[experimentId];
}

export function selectExperimentAssignments(state) {
  return experimentState(state).assignments || {};
}

export function selectExperimentAssignment(state, experimentId) {
  const assignments = selectExperimentAssignments(state);
  return assignments[experimentId];
}
