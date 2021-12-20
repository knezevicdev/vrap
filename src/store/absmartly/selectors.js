export function selectExperiment(state, experimentId) {
  if (!state.absmartly.context) return undefined;
  return !!state.absmartly.context.treatment(experimentId);
}
