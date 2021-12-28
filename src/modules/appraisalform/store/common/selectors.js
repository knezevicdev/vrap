function commonState(state) {
  return state.common || {};
}

export function selectPhoneNumber(state) {
  return commonState(state).phoneNumber || '';
}

export function selectEnabledFeatures(state) {
  return commonState(state).enabledFeatures || [];
}
