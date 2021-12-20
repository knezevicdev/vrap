import { SET_CONTEXT } from './types';

const INITIAL_STATE = {
  context: null
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_CONTEXT:
      return {
        ...state,
        context: action.context
      };
    default:
      return state;
  }
}
