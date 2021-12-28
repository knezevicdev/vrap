import { CommonTypes } from './types';

export const INITIAL_STATE = {
  phoneNumber: '(855) 524-1300',
  error: {
    display: false,
    message: ''
  },
  success: {
    display: false,
    message: ''
  },
  showSpinner: false,
  snackBarConfig: {
    open: false,
    message: 'Thank you',
    showArrow: false,
    isError: false
  },
  utmParams: {},
  subid: '',
  gclid: '',
  campaign: '',
  showHowItWorks: true,
  isMobileOnFirstRender: false,
  enabledFeatures: [],
  segmentUserID: '',
  brand: 'Vroom',
  type: 'Website'
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CommonTypes.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber
      };

    case CommonTypes.SERVER_PREFETCH_FAILED:
      return {
        ...state,
        serverPrefetchFailed: true
      };

    case CommonTypes.SHOW_ERROR:
      return {
        ...state,
        error: {
          display: true,
          message: action.message
        }
      };

    case CommonTypes.HIDE_ERROR:
      return {
        ...state,
        error: {
          display: false,
          message: ''
        }
      };

    case CommonTypes.SHOW_SUCCESS:
      return {
        ...state,
        success: {
          display: true,
          message: action.message
        }
      };

    case CommonTypes.SHOW_SPINNER:
      return {
        ...state,
        showSpinner: action.value
      };

    case CommonTypes.HIDE_SUCCESS:
      return {
        ...state,
        success: {
          display: false,
          message: ''
        }
      };

    case CommonTypes.SHOW_SNACKBAR:
      return {
        ...state,
        snackBarConfig: {
          open: action.showHide,
          message: action.message,
          showArrow: action.showArrow,
          isError: action.isError
        }
      };

    case CommonTypes.SET_MARKETING_CAMPAIGN:
      return {
        ...state,
        campaign: action.campaign
      };

    case CommonTypes.SET_UTM_PARAMS:
      return {
        ...state,
        utmParams: action.utmParams
      };

    case CommonTypes.SET_GCLID_PARAM:
      return {
        ...state,
        gclid: action.gclid
      };

    case CommonTypes.SET_SUBID_PARAM:
      return {
        ...state,
        subid: action.subid
      };

    case CommonTypes.IS_MOBILE:
      return {
        ...state,
        isMobileOnFirstRender: action.isMobile
      };

    case CommonTypes.ENABLE_FEATURE: {
      return {
        ...state,
        enabledFeatures: [...state.enabledFeatures, action.feature]
      };
    }

    case CommonTypes.HIDE_HOW_IT_WORKS:
      return {
        ...state,
        showHowItWorks: false
      };

    case CommonTypes.SET_SEGMENT_USER_ID:
      return {
        ...state,
        segmentUserID: action.userID
      };

    // TECH DEBT: Looks like it's from react-router-redux, evaluate whether still needed
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        error: {
          display: false,
          message: ''
        },
        success: {
          display: false,
          message: ''
        }
      };

    default:
      return state;
  }
}
