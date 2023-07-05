import { useCallback } from 'react';

import {
  acceptDeal,
  declineDeal,
  UpdateDeal,
} from '../../../../../networking/request';
import useAppraisalStore from '../../../../../store/appraisalStore';
import useDealStore from '../../../../../store/dealStore';
import useOfferStore from '../../../../../store/offerStore';

const useAcceptDeclinePrice = (hasValidPrice: boolean) => {
  const setShowOfferDialog = useOfferStore((state) => state.setShowOfferDialog);
  const offerDetail = useOfferStore((state) => state.offerDetail);

  const handleUpdateDeal = useCallback(
    (response: UpdateDeal) => {
      if (!response.isError) {
        window.location.href = response.redirect;
        return;
      }

      useAppraisalStore.getState().setReviewError(response.error);
      setShowOfferDialog(false);
    },
    [setShowOfferDialog]
  );

  const showDealError = useCallback((): void => {
    setShowOfferDialog(false);
    useAppraisalStore
      .getState()
      .setReviewError(
        'Oops! Something went wrong. Please try again or give us a call at (855) 524-1300 to reserve this vehicle.'
      );
  }, [setShowOfferDialog]);

  const deal = useDealStore((state) => state.deal);
  const setDealLoading = useDealStore((state) => state.setLoading);

  const declinePrice = useCallback(async (): Promise<void> => {
    if (!deal) {
      showDealError();
      return;
    }

    setDealLoading(true);
    const response = await declineDeal(deal);
    setDealLoading(false);

    handleUpdateDeal(response);
  }, [deal, setDealLoading, handleUpdateDeal, showDealError]);

  const acceptPrice = useCallback(async (): Promise<void> => {
    if (!hasValidPrice) {
      declinePrice();
      return;
    }

    const offer = offerDetail;
    if (!deal || !offer) {
      showDealError();
      return;
    }

    setDealLoading(true);

    const response = await acceptDeal({
      externalDealID: deal.externalDealID,
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
    setDealLoading(false);

    handleUpdateDeal(response);
  }, [
    deal,
    declinePrice,
    handleUpdateDeal,
    hasValidPrice,
    setDealLoading,
    showDealError,
    offerDetail,
  ]);

  return { acceptPrice, declinePrice };
};

export default useAcceptDeclinePrice;
