import { appraisalActions } from '../appraisal/types';
import { dealActions } from '../deal/types';
import { checkoutTradeTypes } from './types';
import { authActions } from '../user/types';

const INITIAL_STATE = {
  deal: {
    showInProgressBanner: true,
    stepperStep: 0,
    depositPlacedSuccessfully: false,
    skipInsurance: false,
    tradeIn: null,
    dealReviewed: false,
    documents: [],
    registrationCorrelationId: ''
  },
  checkoutTrade: {
    carfax: {},
    gradeCheck: {},
    vehicle: {},
    vehicles: [],
    offerData: [],
    offerDetails: {},
    appraisalForm: {
      vehicleInformation: {},
      vehicleHistory: {},
      interiorConditions: {},
      exteriorConditions: {},
      mechanicalConditions: {},
      yourInformation: {},
      showExactMileageDialog: true,
      isEmpty: true
    },
    nextToExpire: {},
    showExpiringSoonDialog: true,
    vinDecodeData: {}
  }
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  const {
    stepperStep,
    tradeIn,
    showBanner,
    skipInsurance,
    isSuccess,
    newDocument,
    fileId,
    carfaxData,
    gradeCheckData,
    offerData,
    offerDetails,
    vehicle,
    selectedVehicle,
    vehicles,
    appraisalFormInfo,
    data,
    nextToExpire,
    carData,
    correlationId
  } = action;
  const { deal, checkoutTrade } = state;
  switch (action.type) {
    case dealActions.SET_SHOW_BANNER:
      return {
        ...state,
        deal: {
          ...deal,
          showInProgressBanner: showBanner
        }
      };
    case dealActions.SET_TRADE_YES_NO:
      return {
        ...state,
        deal: {
          ...deal,
          tradeIn,
          stepperStep
        }
      };
    case dealActions.RESET_STEPPER_STEP:
      return {
        ...state,
        deal: {
          ...deal,
          stepperStep: 0
        }
      };
    case dealActions.SET_DEAL_REVIEWED:
      return {
        ...state,
        deal: {
          ...deal,
          dealReviewed: true
        }
      };
    case dealActions.SET_STEPPER_STEP: {
      return {
        ...state,
        deal: {
          ...deal,
          stepperStep
        }
      };
    }
    case dealActions.SET_SKIP_INSURANCE: {
      return {
        ...state,
        deal: {
          ...deal,
          skipInsurance
        }
      };
    }
    case dealActions.SET_DEPOSIT_SUCCESS: {
      return {
        ...state,
        deal: {
          ...deal,
          depositPlacedSuccessfully: isSuccess
        }
      };
    }
    case dealActions.SET_IN_PROGRESS_DEAL_DOCUMENTS: {
      const { documents } = deal;
      const updatedDocuments = [newDocument, ...documents];
      return {
        ...state,
        deal: {
          ...deal,
          documents: updatedDocuments
        }
      };
    }
    case dealActions.REMOVE_IN_PROGRESS_DEAL_DOCUMENTS: {
      const { documents } = deal;
      const updatedDocuments = documents.filter(item => item.fileID !== fileId);
      return {
        ...state,
        deal: {
          ...deal,
          documents: updatedDocuments
        }
      };
    }
    case dealActions.RESET_IN_PROGRESS_DEAL_DOCUMENTS: {
      return {
        ...state,
        deal: {
          ...deal,
          documents: []
        }
      };
    }

    case dealActions.REGISTRATION_CORRELATION_ID:
      return {
        ...state,
        deal: {
          ...deal,
          registrationCorrelationId: correlationId
        }
      };

    case checkoutTradeTypes.GET_CARFAX:
    case appraisalActions.GET_CARFAX:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          carfax: { ...carfaxData }
        }
      };
    case checkoutTradeTypes.GRADE_CHECK:
    case appraisalActions.GRADE_CHECK:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          gradeCheck: { ...gradeCheckData }
        }
      };
    case checkoutTradeTypes.DECODE_VIN:
    case appraisalActions.DECODE_VIN:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          vinDecodeData: { ...carData },
          appraisalForm: {
            ...state.checkoutTrade.appraisalForm,
            vehicleInformation: {
              ...state.checkoutTrade.appraisalForm.vehicleInformation,
              year: carData.year,
              model: carData.model,
              make: carData.make,
            },
            showExactMileageDialog: true,
            isEmpty: false
          }
        }
      };
    case checkoutTradeTypes.GET_OFFER_DATA:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          offerData
        }
      };
    case checkoutTradeTypes.SET_OFFER_DATA:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          offerData,
          nextToExpire
        }
      };
    case checkoutTradeTypes.GET_OFFER_DETAILS:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          offerDetails: { ...offerDetails }
        }
      };
    case checkoutTradeTypes.GET_LICENSE_TO_VIN:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          vehicle
        }
      };
    case checkoutTradeTypes.SELECT_VIN_FROM_MANY:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          vehicle: selectedVehicle
        }
      };
    case checkoutTradeTypes.GET_MULTIPLE_VINS_FROM_LP:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          vehicles
        }
      };
    case checkoutTradeTypes.UPDATE_APPRAISAL_INFO:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          appraisalForm: {
            vehicleInformation: {
              ...state.checkoutTrade.appraisalForm.vehicleInfoForm,
              ...appraisalFormInfo.vehicleInfoForm
            },
            vehicleHistory: { ...appraisalFormInfo.vehicleHistoryForm },
            interiorConditions: { ...appraisalFormInfo.intConditionForm },
            exteriorConditions: { ...appraisalFormInfo.extConditionForm },
            mechanicalConditions: { ...appraisalFormInfo.mechConditionForm },
            yourInformation: { ...appraisalFormInfo.personalInfoForm },
            isEmpty: false
          }
        }
      };
    case checkoutTradeTypes.REFRESH_APPRAISAL_INFO:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          appraisalForm: {
            vehicleInformation: {},
            vehicleHistory: {},
            interiorConditions: {},
            exteriorConditions: {},
            mechanicalConditions: {},
            yourInformation: {},
            isEmpty: true
          }
        }
      };
    case checkoutTradeTypes.SET_YEAR_MAKE_MODEL:
    case appraisalActions.SET_YEAR_MAKE_MODEL:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          appraisalForm: {
            ...state.checkoutTrade.appraisalForm,
            vehicleInformation: {
              ...state.checkoutTrade.appraisalForm.vehicleInfoForm,
              year: data.year,
              model: data.model,
              make: data.make,
              source: data.source
            }
          }
        }
      };
    case checkoutTradeTypes.NEXT_EXPIRING_OFFER:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          nextToExpire
        }
      };
    case checkoutTradeTypes.DISMISS_EXPIRING_SOON_DIALOG:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          showExpiringSoonDialog: false
        }
      };

    case checkoutTradeTypes.DISMISS_EXACT_MILEAGE_DIALOG:
      return {
        ...state,
        checkoutTrade: {
          ...checkoutTrade,
          showExactMileageDialog: false
        }
      };
    case authActions.LOGOUT_REQUEST:
      return {
        ...state,
        checkoutTrade: {
          ...INITIAL_STATE.checkoutTrade
        }
      };
    default:
      return state;
  }
}
