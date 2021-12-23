import { SHOW_DIALOG, HIDE_DIALOG } from './types';

const INITIAL_STATE = {
  dialogType: null,
  dialogProps: {}
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SHOW_DIALOG:
      return {
        dialogType: action.dialogType,
        dialogProps: action.dialogProps || {}
      };

    case HIDE_DIALOG:
      return INITIAL_STATE;

    default:
      return state;
  }
}
