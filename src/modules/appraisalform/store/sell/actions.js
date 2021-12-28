import types from './types';

export function updateActiveSection(index) {
  return {
    type: types.UPDATE,
    index
  };
}

export function updateCompletedSections(completedSections, index) {
  return {
    type: types.UPDATE_COMPLETED_SECTIONS,
    completedSections,
    index
  };
}

export function updateField(field, value) {
  return {
    type: types.UPDATE_FIELD,
    field,
    value
  };
}

// obj of field/value pairs (eg. { field1: value1, field2, value2})
export function updateFields(/* Object */ fields) {
  return {
    type: types.UPDATE_FIELDS,
    fields
  };
}

export function createAppraisalRequest() {
  return {
    type: types.CREATE_APPRAISAL_REQUEST
  };
}

export function createAppraisalSuccess(response) {
  return {
    type: types.CREATE_APPRAISAL_SUCCESS,
    response
  };
}

export function createAppraisalFailure(error) {
  return {
    type: types.CREATE_APPRAISAL_FAILURE,
    error
  };
}

export function decodeVinRequest() {
  return {
    type: types.DECODE_VIN_REQUEST
  };
}

export function decodeVinSuccess(response) {
  return {
    type: types.DECODE_VIN_SUCCESS,
    response
  };
}

export function decodeVinFailure(error) {
  return {
    type: types.DECODE_VIN_FAILURE,
    error
  };
}

export function getOptionsRequest() {
  return {
    type: types.GET_OPTIONS_REQUEST
  };
}

export function getOptionsSuccess(response) {
  return {
    type: types.GET_OPTIONS_SUCCESS,
    response
  };
}

export function getOptionsFailure(error) {
  return {
    type: types.GET_OPTIONS_FAILURE,
    error
  };
}

export function restartAppraisal() {
  return {
    type: types.RESTART_APPRAISAL
  };
}

export function setBrand(brand) {
  return {
    type: types.SET_BRAND,
    brand
  };
}

export function setDealership(dealership) {
  return {
    type: types.SET_DEALERSHIP,
    dealership
  };
}

export function setType(appraisalType) {
  return {
    type: types.SET_TYPE,
    appraisalType
  };
}
