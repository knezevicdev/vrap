import { VerificationStore } from '../verificationStore';

import { verificationResp } from 'src/networking/__mocks__/request';

describe('test verification store', () => {
  let store: VerificationStore;
  beforeEach(() => {
    store = new VerificationStore();
  });

  test('change store whereIsVehicleRegistered value ', () => {
    store.setWhereIsVehicleRegistered('NY');
    expect(store.whereIsVehicleRegistered).toEqual('NY');
  });

  test('change priceId value', () => {
    store.setPriceId('12345');
    expect(store.priceId).toEqual('12345');
  });

  test('should call processVerificationData function called ', () => {
    const processVerificationDataSpy = jest.spyOn(
      store,
      'processVerificationData'
    );
    store.getVerificationDetail(verificationResp.data, '0000');
    expect(processVerificationDataSpy).toHaveBeenCalled();
  });

  test('should update values when called processVerificationData ', async () => {
    const ownerInfo = {
      primaryOwner: 'Yes',
      primaryFirst: 'fname',
      primaryLast: 'lname',
      primaryCity: 'Brooklyn',
      primaryState: 'NY',
      primaryZip: '11206',
      primaryAddress: '123 Melrose Street',
      primaryApartment: '',
      primaryPhone: '(555) 555-5555',
      primaryEmail: 'doyouliketesting@testvroom.com',
      secondaryOwner: 'No',
      secondaryFirst: '',
      secondaryLast: '',
      secondaryCity: '',
      secondaryState: '',
      secondaryZip: '',
      secondaryAddress: '',
      secondaryApartment: '',
      secondaryPhone: '',
      secondaryEmail: '',
    };

    const pickupInfo = {
      primaryPickup: 'Yes',
      pickupCity: 'Brooklyn',
      pickupState: 'NY',
      pickupZip: '11206',
      pickupAddress: '123 Melrose Street',
      pickupApartment: '',
      poc: 'Yes',
      pocFirst: 'fname',
      pocLast: 'lname',
      pocPhone: '(555) 555-5555',
      pocEmail: 'doyouliketesting@testvroom.com',
    };

    const payoffInfo = {
      bankName: {
        label: 'Other',
        phone: '',
        value: 'Other',
      },
      bankPhoneNumber: '',
      currentPayments: 'No',
      lastFourSSN: null,
      lienFinancialInstitutionName: '',
      loanAccountNumber: '',
      termsCheckbox: false,
      whereIsVehicleRegistered: '',
    };

    const documents: any[] = [];

    await store.processVerificationData(verificationResp.data);

    expect(store.offerId).toEqual('cb5b06d43cb95286ceeb50efc7a82e08');
    expect(store.formState).toEqual(5);
    expect(store.exactMileage).toEqual(999999);
    expect(store.ownerInfo).toEqual(ownerInfo);
    expect(store.pickupInfo).toEqual(pickupInfo);
    expect(store.payoffInfo).toEqual(payoffInfo);
    expect(store.documents).toEqual(documents);
  });

  test('should change loading when setLoading called', () => {
    store.setLoading(false);
    expect(store.loading).toEqual(false);
  });

  test('should change offerId when setOfferId called', () => {
    store.setOfferId('12345');
    expect(store.offerId).toEqual('12345');
  });

  test('should change lastFourSSN when setLastFourSSN called', () => {
    store.setLastFourSSN('0000');
    expect(store.lastFourSSN).toEqual('0000');
  });
});
