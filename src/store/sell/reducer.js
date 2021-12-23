import types from './types';
import { authActions } from '@app/store/user/types';
import { appraisalActions } from '@app/store/appraisal/types';
import {
  trackStepComplete,
  trackNextStepViewed
} from '@app/lib/analytics/analytics/sell';

import {
  sections,
  errorTypes,
  defaultDealership,
  defaultBrand,
  defaultType
} from './constants';

const numberOfSections = Object.keys(sections).length;

function getModifications(field /*, value */) {
  const newState = {};
  const prefix = field.substring(0, field.indexOf('_') + 1);
  const unprefixedFieldsToClear = [];

  unprefixedFieldsToClear.forEach(field => {
    newState[prefix + field] = undefined;
  });

  return newState;
}

export const appraisalSections = sections;

const INITIAL_STATE = {
  activeSection: 0 /* active appraisal application section */,
  // TODO: Perhaps abstract all errors into a global error state
  decodingFailed: false,
  errorType: null,
  vin: '',
  dealership: defaultDealership,
  brand: defaultBrand,
  type: defaultType,
  completedSections: Object.keys(appraisalSections).reduce((a, b) => {
    return {
      ...a,
      [b]: false
    };
  }, {})
  // leadSubmission: {
  //   leadSubmitted: false,
  //   leadType: "",
  // }
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    // NOTE: To reset the VIN field on refresh if decoding failed
    // TODO: Revisit this functionality
    // case REHYDRATE: {
    //   const { payload = {} } = action
    //   if (payload.sell && payload.sell.vin && payload.sell.decodingFailed) {
    //     return {
    //       ...state,
    //       vin: '',
    //       decodingFailed: false,
    //       dealership: state.dealership,
    //       brand: state.brand,
    //       type: state.type
    //     }
    //   }

    //   return state
    // }

    case types.RESTART_APPRAISAL:
      return {
        ...INITIAL_STATE,
        completedSections: Object.keys(appraisalSections).reduce((a, b) => {
          return {
            ...a,
            [b]: false
          };
        }, {}),
        dealership: state.dealership,
        brand: state.brand,
        type: state.type
      };

    case types.UPDATE:
      return {
        ...state,
        activeSection:
          action.index != null ? action.index : (state.activeSection || 0) + 1
      };

    case types.UPDATE_FIELD: {
      const { field, value } = action;
      const modifications = getModifications(field, value, state);

      return {
        ...state,
        [field]: value,
        ...modifications
      };
    }

    case types.UPDATE_FIELDS: {
      const { fields } = action;
      const keys = Object.keys(fields);
      let modifications = {};

      keys.forEach(key => {
        const newModifications = getModifications(key, fields[key], state);
        if (Object.keys(newModifications).length > 0) {
          modifications = {
            ...modifications,
            ...newModifications
          };
        }
      });

      return {
        ...state,
        ...fields,
        ...modifications
      };
    }

    // https://stackoverflow.com/a/50753272/4842949
    case types.UPDATE_COMPLETED_SECTIONS: {
      const i = action.index;

      trackStepComplete(i);

      // TODO: Clarify this logic
      if (i < numberOfSections - 1) {
        trackNextStepViewed(i + 1);
      }

      return {
        ...state,
        completedSections: action.completedSections
      };
    }

    case types.CREATE_APPRAISAL_REQUEST:
      return {
        ...state,
        appraisalSubmitted: false,
        errorType: null
      };

    case types.CREATE_APPRAISAL_SUCCESS:
      return {
        ...state,
        appraisalSubmitted: true
      };

    case types.CREATE_APPRAISAL_FAILURE: {
      const { error } = action;
      const { message = '' } = error;
      // TODO: Temporary, better error handling needed
      let errorType = errorTypes.default;
      if (message.toLowerCase() === 'existing appraisal in process') {
        errorType = errorTypes.dupe;
      }

      return {
        ...state,
        errorType
      };
    }

    case types.DECODE_VIN_REQUEST:
      return {
        ...state,
        vinDecodeData: null,
        trim: null,
        decodingFailed: false
      };

    case types.DECODE_VIN_SUCCESS:
      return {
        ...state,
        vinDecodeData: {
          ...action.response
        }
      };

    case types.DECODE_VIN_FAILURE:
      return {
        ...state,
        decodingFailed: true
      };

    case types.GET_OPTIONS_REQUEST:
      return {
        ...state,
        optionsData: null
      };

    case types.GET_OPTIONS_SUCCESS:
      return {
        ...state,
        optionsData: {
          ...action.response
        }
      };

    case types.SET_BRAND:
      return {
        ...state,
        brand: action.brand
      };

    case types.SET_DEALERSHIP:
      return {
        ...state,
        dealership: action.dealership
      };

    case types.SET_TYPE:
      return {
        ...state,
        type: action.appraisalType
      };

    case authActions.LOGOUT_REQUEST:
      return {
        leadSubmission: state.leadSubmission,
        ...INITIAL_STATE
      };

    case authActions.SET_USER_INFO:
      return {
        ...state,
        firstName: action.userInfo.firstName,
        lastName: action.userInfo.lastName,
        email: action.userInfo.username,
        phoneNumber: action.userInfo.phone
      };

    case appraisalActions.UPDATE_APPRAISAL_INFO:
      return {
        ...state,
        firstName: action.appraisalFormInfo.personalInfoForm.firstName,
        lastName: action.appraisalFormInfo.personalInfoForm.lastName,
        email: action.appraisalFormInfo.personalInfoForm.email,
        phoneNumber: action.appraisalFormInfo.personalInfoForm.phoneNumber
      };

    default:
      return state;
  }
}
