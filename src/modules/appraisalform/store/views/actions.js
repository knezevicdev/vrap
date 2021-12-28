import { checkoutTradeTypes } from './types';

export const setOfferData = (offerData, nextToExpire) => ({
  type: checkoutTradeTypes.SET_OFFER_DATA,
  offerData,
  nextToExpire
});
