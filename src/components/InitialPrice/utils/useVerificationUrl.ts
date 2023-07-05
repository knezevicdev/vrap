import usePriceStore from '../../../modules/price/store';

const useVerificationUrl = () => {
  const priceId = usePriceStore((state) => state.price.priceId);

  return `/sell/verification?priceId=${priceId}`;
};

export default useVerificationUrl;
