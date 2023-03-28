import useIsTradeIn from '../../../hooks/useIsTradeIn';

import { useAppStore } from 'src/context';

const useHandleAppraisalRoutes = (): void => {
  const isTradeIn = useIsTradeIn();
  const { store } = useAppStore();

  store.appraisal.setIsTradeIn(isTradeIn);
};

export default useHandleAppraisalRoutes;
