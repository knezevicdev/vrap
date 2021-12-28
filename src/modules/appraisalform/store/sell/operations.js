import {
  decodeVinRequest,
  decodeVinSuccess,
  decodeVinFailure,
  createAppraisalRequest,
  createAppraisalSuccess,
  createAppraisalFailure,
  setDealership
} from '../sell/actions';
import { appraisalYearMakeModel } from '../appraisal/operations';
import { postAppraisal, getVinDecode } from '../../api';

export function decodeVin(vin) {
  return dispatch => {
    dispatch(decodeVinRequest());

    return getVinDecode(vin)
      .then(response => {
        if (response && response.success) {
          dispatch(decodeVinSuccess(response));
          dispatch(appraisalYearMakeModel(response.data.basicData));
          return response;
        } else {
          dispatch(decodeVinFailure(response));
          throw response;
        }
      })
      .catch(error => {
        dispatch(decodeVinFailure(error));
        const message = error.message;
        return Promise.reject(`Error: ${message}`);
      });
  };
}

export function createAppraisal(appraisalData) {
  return dispatch => {
    dispatch(createAppraisalRequest());

    return postAppraisal(appraisalData)
      .then(response => {
        dispatch(createAppraisalSuccess(response));
        return response;
      })
      .catch(error => {
        dispatch(createAppraisalFailure(error));
        const message = error.message;
        return Promise.reject(`Error: ${message}`);
      });
  };
}

export function setDealershipData(dealership) {
  return dispatch => {
    dispatch(setDealership(dealership));
  };
}
