import { PaymentStore } from '../paymentStore';

describe('test payment store', () => {
  let store: PaymentStore;
  beforeEach(() => {
    store = new PaymentStore();
  });

  test('change store setSubmitType value ', () => {
    store.setSubmitType('Check');
    expect(store.submittedType).toEqual('Check');
  });

  test('test change value, priceId, address', () => {
    const paymentOverviewFormValues = {
      paymentOption: 'Check by Mail',
      routingNumber: '',
      bankAccountNumber: '',
      isPrimaryAddress: 'Yes',
      address: '123 broadway',
      apartment: '',
      city: 'New York',
      state: 'NY',
      zipcode: '10001',
    };

    const address = {
      address_1: '123 broadway',
      address_2: '',
      city: 'New York',
      state: 'NY',
      zipcode: '10001',
    };

    const priceId = '123456';
    store.setValues(paymentOverviewFormValues, priceId, address);
    expect(store.values).toEqual(paymentOverviewFormValues);
    expect(store.priceId).toEqual(priceId);
    expect(store.address).toEqual(address);
  });
});
