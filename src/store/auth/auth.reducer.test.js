import { SET_UUID } from './types';
import reducer from './reducer';
describe('Auth Reducer', () => {
  const init_state = {
    uuid: null
  };
  describe('set uuid', () => {
    test('it should set the uuid that is sent in the action', () => {
      const action = {
        type: SET_UUID,
        uuid: 12345
      };
      const expectedState = {
        uuid: 12345
      };
      const updatedState = reducer(init_state, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('default', () => {
    test('if should return the init state if passed with no state or action', () => {
      const expectedState = {
        uuid: null
      };
      const updatedState = reducer();
      expect(updatedState).toEqual(expectedState);
    });
  });
});
