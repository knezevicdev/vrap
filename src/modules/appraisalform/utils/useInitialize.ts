import { getInProgressDeal } from '../../../networking/request';
import Store from '../../../store';

const useInitialize = (store: Store) => {
  return async () => {
    try {
      const deal = await getInProgressDeal();
      store.deal.setDeal(deal);
    } catch (e) {
      console.log('Error while fetching deal');
    }
  };
};

export default useInitialize;
