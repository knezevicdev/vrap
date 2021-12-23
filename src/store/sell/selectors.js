function sellState(state) {
  return state.sell || {};
}

export function selectFirstName(state) {
  return sellState(state).firstName;
}

export function selectDealership(state) {
  return sellState(state).dealership;
}
