import { useCallback } from 'react';

import { declineDeal, UpdateDeal } from '../../../networking/request';
import useDealStore from '../../../store/dealStore';

const useCancelOffer = () => {
  const setTradeInError = useDealStore((state) => state.setTradeInError);
  const setDealLoading = useDealStore((state) => state.setLoading);
  const deal = useDealStore((state) => state.deal);

  const tradeInErrored = useCallback(() => {
    setTradeInError(
      'Your changes were unable to be saved because your transaction has new updates. Please try submitting again.'
    );
  }, [setTradeInError]);

  const handleUpdateDeal = useCallback(
    (response: UpdateDeal): void => {
      if (!response.isError) {
        window.location.href = response.redirect;
        return;
      }

      tradeInErrored();
    },
    [tradeInErrored]
  );

  return useCallback(async (): Promise<void> => {
    setTradeInError('');
    setDealLoading(true);

    if (deal) {
      const response = await declineDeal(deal);
      handleUpdateDeal(response);
    } else {
      tradeInErrored();
    }

    setDealLoading(false);
  }, [deal, handleUpdateDeal, setDealLoading, setTradeInError, tradeInErrored]);
};

export default useCancelOffer;
