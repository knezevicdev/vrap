import { PriceStore } from '../../../modules/price/store';

const useInitialRegistrationData = (store: PriceStore) => {
  return {
    firstName: store.price.userFirstName,
    lastName: store.price.userLastName,
    phoneNumber: store.price.userPhone,
  };
};

export default useInitialRegistrationData;
