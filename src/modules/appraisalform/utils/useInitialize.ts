import { getInProgressDeal } from '../../../networking/request';
import useDealStore from '../../../store/dealStore';

const useInitialize = () => {
  const setDeal = useDealStore((state) => state.setDeal);

  return async () => {
    try {
      const deal = await getInProgressDeal();
      setDeal(deal);
    } catch (e) {
      console.log('Error while fetching deal');
    }
  };
};

export default useInitialize;
