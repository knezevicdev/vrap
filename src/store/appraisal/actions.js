import { appraisalActions } from './types';

export const setOfferData = (offerData, nextToExpire) => ({
  type: appraisalActions.SET_OFFER_DATA,
  offerData,
  nextToExpire
});
