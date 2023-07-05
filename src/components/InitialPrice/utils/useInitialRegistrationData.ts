import usePriceStore from '../../../modules/price/store';

const useInitialRegistrationData = () => {
  const price = usePriceStore((state) => state.price);

  return {
    firstName: price.userFirstName,
    lastName: price.userLastName,
    phoneNumber: price.userPhone,
  };
};

export default useInitialRegistrationData;
