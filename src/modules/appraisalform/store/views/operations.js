import {
  getGradeCheck,
  getVinDecode,
  handleCarfaxApi,
  handleGetAppraisal,
  handleGetAppraisalDataApi,
  handleGetOfferDataApi,
  handleLicenseToVinApi,
} from '../../api';
import { getNextOfferToExpire } from '../appraisal/utils';
import {
  createAppraisalFailure,
  createAppraisalSuccess,
} from '../sell/actions';
import { setOfferData } from '../views/actions';
import { checkoutTradeTypes } from './types';

export function handleLicenseToVin(licenseInfo) {
  return (dispatch) => {
    return handleLicenseToVinApi(licenseInfo)
      .then((response) => {
        const {
          data: { vehicles },
        } = response;
        if (vehicles.length > 1) {
          dispatch({
            type: checkoutTradeTypes.GET_MULTIPLE_VINS_FROM_LP,
            vehicles,
          });
        } else {
          dispatch({
            type: checkoutTradeTypes.GET_LICENSE_TO_VIN,
            vehicle: vehicles[0],
          });
        }
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  };
}

export function handleCarfaxCall(vin) {
  return (dispatch) => {
    return handleCarfaxApi(vin)
      .then((response) => {
        dispatch({
          type: checkoutTradeTypes.GET_CARFAX,
          carfaxData: response,
        });
        return response;
      })
      .catch((error) => {
        return error;
      });
  };
}

export function handleGetOfferData(email) {
  return (dispatch) => {
    return handleGetOfferDataApi(email)
      .then((response) => {
        const offerArray = response.data.offerByEmail;
        const nextToExpire = getNextOfferToExpire(offerArray);
        dispatch(setOfferData(offerArray, nextToExpire));
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  };
}

export function handleGetAppraisalData(email, vin) {
  return (dispatch) => {
    const offerParams = { email, vin };
    return handleGetAppraisalDataApi(offerParams)
      .then((response) => {
        dispatch({
          type: checkoutTradeTypes.GET_OFFER_DETAILS,
          offerDetails: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  };
}

export function selectVinFromMany(selectedVehicle) {
  return (dispatch) => {
    dispatch({
      type: checkoutTradeTypes.SELECT_VIN_FROM_MANY,
      selectedVehicle,
    });
  };
}

export function setAppraisal(appraisalFormInfo) {
  return (dispatch) => {
    dispatch({
      type: checkoutTradeTypes.SET_APPRAISAL_INFO,
      appraisalFormInfo,
    });
  };
}

export function updateAppraisal(appraisalFormInfo) {
  return (dispatch) => {
    dispatch({
      type: checkoutTradeTypes.UPDATE_APPRAISAL_INFO,
      appraisalFormInfo,
    });
  };
}

export function clearAppraisal() {
  return (dispatch) => {
    dispatch({
      type: checkoutTradeTypes.REFRESH_APPRAISAL_INFO,
    });
  };
}

export function appraisalYearMakeModel(data) {
  return (dispatch) => {
    dispatch({
      type: checkoutTradeTypes.SET_YEAR_MAKE_MODEL,
      data,
    });
  };
}

export function realTimeOffer(offerData) {
  return (dispatch) => {
    dispatch({
      type: checkoutTradeTypes.RECEIVED_REAL_TIME_OFFER,
      offerData,
    });
  };
}

export function setExpireDialogDismiss() {
  return (dispatch) => {
    dispatch({
      type: checkoutTradeTypes.DISMISS_EXPIRING_SOON_DIALOG,
    });
  };
}

export function decodeVin(vin) {
  return (dispatch) => {
    return getVinDecode(vin)
      .then((response) => {
        dispatch({
          type: checkoutTradeTypes.DECODE_VIN,
          carData: response.data.decodeVIN,
        });
        return response.data.decodeVIN;
      })
      .catch((error) => {
        return error;
      });
  };
}

export function gradeCheck(make, model, trim, miles, vin) {
  return (dispatch) => {
    return getGradeCheck(make, model, trim, miles, vin)
      .then((response) => {
        dispatch({
          type: checkoutTradeTypes.GRADE_CHECK,
          gradeCheckData: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  };
}

export function setMileageDialogDismiss() {
  return (dispatch) => {
    dispatch({
      type: checkoutTradeTypes.DISMISS_EXACT_MILEAGE_DIALOG,
    });
  };
}

export function getAppraisal(offerId) {
  return (dispatch) => {
    return handleGetAppraisal(offerId)
      .then((response) => {
        dispatch(createAppraisalSuccess(response));
        return response;
      })
      .catch((error) => {
        dispatch(createAppraisalFailure(error));
        const message = error.message;
        return Promise.reject(`Error: ${message}`);
      });
  };
}
