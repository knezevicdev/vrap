import { appraisalActions } from './types';
import { authActions } from '@app/store/user/types';

const INITIAL_STATE = {
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
  vinDecodeData: {},
  payloadData: {}
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  const {
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
    payloadData
  } = action;
  switch (action.type) {
    case appraisalActions.GET_CARFAX:
      return {
        ...state,
        carfax: { ...carfaxData }
      };
    case appraisalActions.GRADE_CHECK:
      return {
        ...state,
        gradeCheck: { ...gradeCheckData }
      };
    case appraisalActions.DECODE_VIN:
      return {
        ...state,
        vinDecodeData: { ...carData },
        appraisalForm: {
          ...state.appraisalForm,
          vehicleInformation: {
            ...state.appraisalForm.vehicleInformation,
            year: carData.basicData.year,
            model: carData.basicData.model,
            make: carData.basicData.make,
            source: carData.basicData.source
          },
          showExactMileageDialog: true,
          isEmpty: false
        }
      };
    case appraisalActions.GET_OFFER_DATA:
      return {
        ...state,
        offerData
      };
    case appraisalActions.SET_OFFER_DATA:
      return {
        ...state,
        offerData,
        nextToExpire
      };
    case appraisalActions.GET_OFFER_DETAILS:
      return {
        ...state,
        offerDetails: { ...offerDetails }
      };
    case appraisalActions.GET_LICENSE_TO_VIN:
      return {
        ...state,
        vehicle
      };
    case appraisalActions.SELECT_VIN_FROM_MANY:
      return {
        ...state,
        vehicle: selectedVehicle
      };
    case appraisalActions.GET_MULTIPLE_VINS_FROM_LP:
      return {
        ...state,
        vehicles
      };
    case appraisalActions.SET_APPRAISAL_INFO:
      return {
        ...INITIAL_STATE,
        offerData: state.offerData,
        appraisalForm: {
          vehicleInformation: { ...appraisalFormInfo.vehicleInfoForm },
          vehicleHistory: { ...appraisalFormInfo.vehicleHistoryForm },
          interiorConditions: { ...appraisalFormInfo.intConditionForm },
          exteriorConditions: { ...appraisalFormInfo.extConditionForm },
          mechanicalConditions: { ...appraisalFormInfo.mechConditionForm },
          yourInformation: { ...appraisalFormInfo.personalInfoForm },
          isEmpty: false
        }
      };
    case appraisalActions.UPDATE_APPRAISAL_INFO:
      return {
        ...state,
        appraisalForm: {
          vehicleInformation: {
            ...state.appraisalForm.vehicleInfoForm,
            ...appraisalFormInfo.vehicleInfoForm
          },
          vehicleHistory: { ...appraisalFormInfo.vehicleHistoryForm },
          interiorConditions: { ...appraisalFormInfo.intConditionForm },
          exteriorConditions: { ...appraisalFormInfo.extConditionForm },
          mechanicalConditions: { ...appraisalFormInfo.mechConditionForm },
          yourInformation: { ...appraisalFormInfo.personalInfoForm },
          isEmpty: false
        }
      };
    case appraisalActions.UPDATE_APPRAISAL_PAYLOAD_DATA:
      return {
        ...state,
        payloadData
      };
    case appraisalActions.REFRESH_APPRAISAL_INFO:
      return {
        ...state,
        appraisalForm: {
          vehicleInformation: {},
          vehicleHistory: {},
          interiorConditions: {},
          exteriorConditions: {},
          mechanicalConditions: {},
          yourInformation: {},
          isEmpty: true
        },
        payloadData: {}
      };
    case appraisalActions.SET_YEAR_MAKE_MODEL:
      return {
        ...state,
        appraisalForm: {
          ...state.appraisalForm,
          vehicleInformation: {
            ...state.appraisalForm.vehicleInfoForm,
            year: data.year,
            model: data.model,
            make: data.make,
            source: data.source
          }
        }
      };
    case appraisalActions.NEXT_EXPIRING_OFFER:
      return {
        ...state,
        nextToExpire
      };
    case appraisalActions.DISMISS_EXPIRING_SOON_DIALOG:
      return {
        ...state,
        showExpiringSoonDialog: false
      };

    case appraisalActions.DISMISS_EXACT_MILEAGE_DIALOG:
      return {
        ...state,
        showExactMileageDialog: false
      };

    case authActions.LOGOUT_REQUEST:
      return {
        ...state,
        nextToExpire: {},
        showExpiringSoonDialog: true
      };
    default:
      return state;
  }
}
