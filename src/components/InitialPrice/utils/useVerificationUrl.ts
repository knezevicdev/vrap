import { PriceStore } from '../../../modules/price/store';

const useVerificationUrl = (store: PriceStore) => {
  return `/sell/verification?priceId=${store.price.priceId}`;
};

export default useVerificationUrl;
