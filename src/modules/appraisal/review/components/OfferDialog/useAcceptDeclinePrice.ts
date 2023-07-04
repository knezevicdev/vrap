import { useCallback } from 'react';

import {
  acceptDeal,
  declineDeal,
  UpdateDeal,
} from '../../../../../networking/request';
import Store from '../../../../../store';

const useAcceptDeclinePrice = (hasValidPrice: boolean, store: Store) => {
  const handleUpdateDeal = useCallback(
    (response: UpdateDeal) => {
      if (!response.isError) {
        window.location.href = response.redirect;
        return;
      }

      store.appraisal.setReviewError(response.error);
      store.offer.setShowOfferDialog(false);
    },
    [store.appraisal, store.offer]
  );

  const showDealError = useCallback((): void => {
    store.offer.setShowOfferDialog(false);
    store.appraisal.setReviewError(
      'Oops! Something went wrong. Please try again or give us a call at (855) 524-1300 to reserve this vehicle.'
    );
  }, [store.appraisal, store.offer]);

  const declinePrice = useCallback(async (): Promise<void> => {
    if (!store.deal.deal) {
      showDealError();
      return;
    }

    store.deal.setLoading(true);
    const response = await declineDeal(store.deal.deal);
    store.deal.setLoading(false);

    handleUpdateDeal(response);
  }, [handleUpdateDeal, showDealError, store.deal]);

  const acceptPrice = useCallback(async (): Promise<void> => {
    if (!hasValidPrice) {
      declinePrice();
      return;
    }

    const offer = store.offer.offerDetail;
    if (!store.deal.deal || !offer) {
      showDealError();
      return;
    }

    store.deal.setLoading(true);

    const response = await acceptDeal({
      externalDealID: store.deal.deal.externalDealID,
      appraisalID: offer.id,
      offerID: offer.offerId,
      offerPrice: offer.price,
      vin: offer.vin,
      make: offer.make,
      carModel: offer.model,
      year: offer.year,
      email: offer.email,
      offerStatus: offer.offerStatus,
      expirationDate: offer.offerExpiration,
      source: 'web',
    });
    store.deal.setLoading(false);

    handleUpdateDeal(response);
  }, [
    declinePrice,
    handleUpdateDeal,
    hasValidPrice,
    showDealError,
    store.deal,
    store.offer.offerDetail,
  ]);

  return { acceptPrice, declinePrice };
};

export default useAcceptDeclinePrice;
