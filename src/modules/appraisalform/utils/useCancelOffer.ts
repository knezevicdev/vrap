import { useCallback } from 'react';

import { declineDeal, UpdateDeal } from '../../../networking/request';
import Store from '../../../store';

const useCancelOffer = (store: Store) => {
  const tradeInErrored = useCallback(() => {
    store.deal.setTradeInError(
      'Your changes were unable to be saved because your transaction has new updates. Please try submitting again.'
    );
  }, [store.deal]);

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
    store.deal.setTradeInError('');
    store.deal.setLoading(true);

    if (store.deal.deal) {
      const response = await declineDeal(store.deal.deal);
      handleUpdateDeal(response);
    } else {
      tradeInErrored();
    }

    store.deal.setLoading(false);
  }, [handleUpdateDeal, store.deal, tradeInErrored]);
};

export default useCancelOffer;
