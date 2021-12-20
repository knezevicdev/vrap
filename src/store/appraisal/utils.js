import { parseBackEndDate, dateDiff } from '@app/lib/utils/utils';

export const getNextOfferToExpire = offerArr => {
  const todayDate = new Date();
  let leastDaysToExpire = Infinity;
  let nextToExpire;

  offerArr.forEach(offer => {
    if (offer.offer_status === 'Pending') {
      let expirationDate = parseBackEndDate(offer.Good_Until__c);
      let isExpiringSoon =
        dateDiff(expirationDate.datetime, todayDate) <= 4 &&
        dateDiff(expirationDate.datetime, todayDate) >= 0;
      let daysUntilExpired = dateDiff(expirationDate.datetime, todayDate);

      if (isExpiringSoon && daysUntilExpired < leastDaysToExpire) {
        leastDaysToExpire = daysUntilExpired;
        nextToExpire = {
          ...offer,
          daysToExpire: leastDaysToExpire,
          expirationDate
        };
      }
    } else {
      return;
    }
  });

  return nextToExpire;
};
