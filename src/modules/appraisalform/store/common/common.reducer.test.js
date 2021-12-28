import { CommonTypes } from './types';
import reducer, { INITIAL_STATE } from './reducer';

describe('The common reducers', () => {
  describe('set phone number', () => {
    test('it should set the state with the phone number passed in from the action', () => {
      const action = {
        type: CommonTypes.SET_PHONE_NUMBER,
        phoneNumber: '123456'
      };
      const expectedState = {
        ...INITIAL_STATE,
        phoneNumber: '123456'
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('server prefetch failed', () => {
    test('it should set the server prefetch failed to false', () => {
      const action = {
        type: CommonTypes.SERVER_PREFETCH_FAILED
      };
      const expectedState = {
        ...INITIAL_STATE,
        serverPrefetchFailed: true
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('show error', () => {
    test('it should set the error to true with the message sent from the action', () => {
      const action = {
        type: CommonTypes.SHOW_ERROR,
        message: 'this is an error message'
      };
      const expectedState = {
        ...INITIAL_STATE,
        error: {
          display: true,
          message: 'this is an error message'
        }
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('hide error', () => {
    test('it should set the error display to false and the message to blank', () => {
      const action = {
        type: CommonTypes.HIDE_ERROR
      };
      const newInitState = {
        ...INITIAL_STATE,
        error: {
          display: true,
          message: 'this is a test'
        }
      };
      const expectedState = {
        ...INITIAL_STATE,
        error: {
          display: false,
          message: ''
        }
      };
      const updatedState = reducer(newInitState, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('show success', () => {
    test('it should set the success flag to true and set the message', () => {
      const action = {
        type: CommonTypes.SHOW_SUCCESS,
        message: 'this is a success message'
      };
      const expectedState = {
        ...INITIAL_STATE,
        success: {
          display: true,
          message: 'this is a success message'
        }
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('show spinner', () => {
    test('it should update the showSpinner to what is passed in the action', () => {
      const action = {
        type: CommonTypes.SHOW_SPINNER,
        value: true
      };
      const expectedState = {
        ...INITIAL_STATE,
        showSpinner: true
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('hide success', () => {
    test('it should update the success to display false and no message', () => {
      const action = {
        type: CommonTypes.HIDE_SUCCESS
      };
      const newInitState = {
        ...INITIAL_STATE,
        success: {
          display: true,
          message: 'this is a test'
        }
      };
      const expectedState = {
        ...INITIAL_STATE,
        success: {
          display: false,
          message: ''
        }
      };
      const updatedState = reducer(newInitState, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('show snackbar', () => {
    test('it should update the snackbar config with what is passed from the action', () => {
      const action = {
        type: CommonTypes.SHOW_SNACKBAR,
        showHide: true,
        message: 'test',
        showArrow: true,
        isError: true
      };
      const expectedState = {
        ...INITIAL_STATE,
        snackBarConfig: {
          open: true,
          message: 'test',
          showArrow: true,
          isError: true
        }
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('set marketing campagin', () => {
    test('it should update the marketing campaign', () => {
      const action = {
        type: CommonTypes.SET_MARKETING_CAMPAIGN,
        campaign: 'this is a test'
      };
      const expectedState = {
        ...INITIAL_STATE,
        campaign: 'this is a test'
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('set UTM params', () => {
    test('it should update the utm params', () => {
      const action = {
        type: CommonTypes.SET_UTM_PARAMS,
        utmParams: {
          utmSources: 'this is a test'
        }
      };
      const expectedState = {
        ...INITIAL_STATE,
        utmParams: {
          utmSources: 'this is a test'
        }
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('set gclid param', () => {
    test('it should set the gclid from the action', () => {
      const action = {
        type: CommonTypes.SET_GCLID_PARAM,
        gclid: 'this is a test'
      };
      const expectedState = {
        ...INITIAL_STATE,
        gclid: 'this is a test'
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('set subid param', () => {
    test('it should set the sub id', () => {
      const action = {
        type: CommonTypes.SET_SUBID_PARAM,
        subid: 'this is a test'
      };
      const expectedState = {
        ...INITIAL_STATE,
        subid: 'this is a test'
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('is mobile', () => {
    test('it should set the isMobileOnFirstRender', () => {
      const action = {
        type: CommonTypes.IS_MOBILE,
        isMobile: true
      };
      const expectedState = {
        ...INITIAL_STATE,
        isMobileOnFirstRender: true
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('enable feature', () => {
    const action = {
      type: CommonTypes.ENABLE_FEATURE,
      feature: {
        test: 1
      }
    };
    const newInitState = {
      ...INITIAL_STATE,
      enabledFeatures: [{ test: 2 }, { test: 3 }]
    };
    const expectedState = {
      ...INITIAL_STATE,
      enabledFeatures: [{ test: 2 }, { test: 3 }, { test: 1 }]
    };
    const updatedState = reducer(newInitState, action);
    expect(updatedState).toEqual(expectedState);
  });

  describe('hide how it works', () => {
    test('it should set the show how it works to false', () => {
      const action = {
        type: CommonTypes.HIDE_HOW_IT_WORKS
      };
      const expectedState = {
        ...INITIAL_STATE,
        showHowItWorks: false
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('LOCATION CHANGE', () => {
    test('it should hide the erorr and success messages', () => {
      const action = {
        type: '@@router/LOCATION_CHANGE'
      };
      const expectedState = {
        ...INITIAL_STATE,
        success: {
          display: false,
          message: ''
        },
        error: {
          display: false,
          message: ''
        }
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(expectedState);
    });
  });

  describe('default catch', () => {
    test('it should return the passed state if called with a invalid action', () => {
      const action = {
        type: 'fake action'
      };
      const updatedState = reducer(INITIAL_STATE, action);
      expect(updatedState).toEqual(INITIAL_STATE);
    });

    test('it should set the init state if called with no state or action', () => {
      const updatedState = reducer();
      expect(updatedState).toEqual(INITIAL_STATE);
    });
  });
});
