function authState(state) {
  return state.auth || {};
}

export function selectUUID(state) {
  return authState(state).uuid;
}
