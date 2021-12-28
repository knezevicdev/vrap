import { SET_THEME } from './types';

const INITIAL_STATE = {
  mode: undefined,
  type: 'vroom'
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_THEME: {
      return action.theme;
    }

    default:
      return state;
  }
}
