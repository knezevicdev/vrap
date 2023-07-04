import useIsTradeIn from '../../../hooks/useIsTradeIn';
import useAppraisalStore from '../../../store/appraisalStore';

const useHandleAppraisalRoutes = (): void => {
  const isTradeIn = useIsTradeIn();
  const setIsTradeIn = useAppraisalStore((state) => state.setIsTradeIn);

  setIsTradeIn(isTradeIn);
};

export default useHandleAppraisalRoutes;
