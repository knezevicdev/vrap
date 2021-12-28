import { CommonTypes } from './types';

export function setPhoneNumber(phoneNumber) {
  return {
    type: CommonTypes.SET_PHONE_NUMBER,
    phoneNumber
  };
}

export function serverPrefetchFailed() {
  return {
    type: CommonTypes.SERVER_PREFETCH_FAILED
  };
}

export function showError(message) {
  window.scrollTo(0, 0);
  return {
    type: CommonTypes.SHOW_ERROR,
    message
  };
}

export function hideError() {
  return {
    type: CommonTypes.HIDE_ERROR
  };
}

export function showSuccess(message) {
  return {
    type: CommonTypes.SHOW_SUCCESS,
    message
  };
}

export function hideSuccess() {
  return {
    type: CommonTypes.HIDE_SUCCESS
  };
}

export const showSnackBar = (showHide, message, showArrow, isError) => ({
  type: CommonTypes.SHOW_SNACKBAR,
  showHide,
  message,
  showArrow,
  isError
});

export function setUtmParams(utmParams) {
  return {
    type: CommonTypes.SET_UTM_PARAMS,
    utmParams
  };
}
export function setMarketingCampaign(campaign) {
  return {
    type: CommonTypes.SET_MARKETING_CAMPAIGN,
    campaign
  };
}

export function setGclidParam(gclid) {
  return {
    type: CommonTypes.SET_GCLID_PARAM,
    gclid
  };
}

export function setSubidParam(subid) {
  return {
    type: CommonTypes.SET_SUBID_PARAM,
    subid
  };
}

export function setIsMobileOnFirstRender(isMobile) {
  return {
    type: CommonTypes.IS_MOBILE,
    isMobile
  };
}

export function setFeatureEnabled(feature) {
  return {
    type: CommonTypes.ENABLE_FEATURE,
    feature
  };
}

export function hideHowItWorks() {
  return {
    type: CommonTypes.HIDE_HOW_IT_WORKS
  };
}

export function showSpinner(value) {
  return {
    type: CommonTypes.SHOW_SPINNER,
    value
  };
}

export function setSegmentUserID(userID) {
  return {
    type: CommonTypes.SET_SEGMENT_USER_ID,
    userID
  };
}
