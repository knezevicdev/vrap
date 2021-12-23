import { SET_UUID } from './types';

const INITIAL_STATE = {
  uuid: null
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_UUID:
      return {
        ...state,
        uuid: action.uuid
      };

    default:
      return state;
  }
}
