import { isErrorResponse } from '@vroom-web/networking';
import { useEffect, useRef, useState } from 'react';

import { useAppStore } from 'src/context';
import {
  getOfferDetails,
  getVerificationDetails,
} from 'src/networking/request';

const useFetchVerificationData = (priceId: string): string | undefined => {
  const { store } = useAppStore();
  const lastPriceId = useRef<string>();
  const [vin, setVin] = useState('');

  useEffect(() => {
    if (lastPriceId.current !== priceId) {
      store.verification.setLoading(true);
      lastPriceId.current = priceId;
      Promise.all([getVerificationDetails(priceId), getOfferDetails(priceId)])
        .then(([getVerificationDetailsResponse, getOfferDetailsResponse]) => {
          if (
            isErrorResponse(getVerificationDetailsResponse) ||
            isErrorResponse(getOfferDetailsResponse)
          ) {
            store.verification.setIsExpiredOrErrored(true);
            return;
          }
          store.verification.getVerificationDetail(
            {
              ...getVerificationDetailsResponse.data.data,
              vin: getOfferDetailsResponse.data.data[0].VIN__c,
            },
            localStorage.getItem('lastFour') || store.verification.lastFourSSN
          );
          setVin(getOfferDetailsResponse.data.data[0].VIN__c);
        })
        .catch((e) => {
          store.verification.setIsExpiredOrErrored(true);
          console.error('Error while fetching verification', e);
        })
        .finally(() => {
          store.verification.setLoading(false);
        });
    }
  }, [priceId, store.verification]);

  return vin;
};

export default useFetchVerificationData;
