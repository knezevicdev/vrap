import reducer from './reducer';
import { appraisalActions } from './types';

describe('Apprasial Reducer', () => {
  const initial_state = {
    vehicle: {},
    vehicles: []
  };
  describe('GET_LICENSE_TO_VIN', () => {
    test('it should update the state with the vehicle', () => {
      const vehicle = {
        color: 'red',
        make: 'Ford',
        model: 'Escort'
      };
      const action = {
        type: appraisalActions.GET_LICENSE_TO_VIN,
        vehicle,
        selectedVehicle: {
          wrong: true
        },
        vehicles: [1, 2, 3, 4]
      };
      const updatedState = reducer(initial_state, action);
      const expectedState = {
        vehicle: {
          color: 'red',
          make: 'Ford',
          model: 'Escort'
        },
        vehicles: []
      };
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('SELECT_VIN_FROM_MANY', () => {
    test('it should update the state with the selected vehicle', () => {
      const selectedVehicle = {
        color: 'blue',
        make: 'Ford',
        model: 'Escape'
      };
      const action = {
        type: appraisalActions.SELECT_VIN_FROM_MANY,
        selectedVehicle,
        vehicle: {
          wrong: true
        },
        vehicles: [1, 2, 3, 4]
      };
      const updatedState = reducer(initial_state, action);
      const expectedState = {
        vehicle: {
          color: 'blue',
          make: 'Ford',
          model: 'Escape'
        },
        vehicles: []
      };
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('GET_MULTIPLE_VINS_FROM_LP', () => {
    test('it should update the state with an array of vehicles', () => {
      const vehicles = [1, 2, 3, 4];
      const action = {
        type: appraisalActions.GET_MULTIPLE_VINS_FROM_LP,
        vehicles,
        selectedVehicle: {
          wrong: true
        },
        vehicle: {
          wrong: true
        }
      };
      const updatedState = reducer(initial_state, action);
      const expectedState = {
        vehicles: [1, 2, 3, 4],
        vehicle: {}
      };
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('default', () => {
    test('it should return the init state if called with a bad action', () => {
      const action = {
        type: 'bad action'
      };
      const updatedState = reducer(initial_state, action);
      expect(updatedState).toEqual(initial_state);
    });

    test('it should return the init state if called with no state or action', () => {
      const updatedState = reducer();
      expect(updatedState).toEqual(initial_state);
    });
  });
});
