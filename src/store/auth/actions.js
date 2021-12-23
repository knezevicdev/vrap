import { SET_UUID } from './types';

export function setUuid(uuid) {
  return {
    type: SET_UUID,
    uuid
  };
}
