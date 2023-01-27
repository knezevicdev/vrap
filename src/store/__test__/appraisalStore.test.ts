import { AppraisalStore } from '../appraisalStore';

describe('test appraisal store methods', () => {
  const formInfoTestObj = {
    vehicleInfoForm: {
      vin: 'magicvinnumber',
      exteriorColor: 'blue',
      keysAmount: '2+',
      make: 'make mock',
      mileage: 1212,
      model: 'model mock',
      trim: 'yes',
      vehicleOptions: ['option1', 'option2'],
      year: 1985,
      zipCode: '12345',
    },
    vehicleHistoryForm: {
      hasAccident: 'No accident',
      titleStatus: 'Title status',
      state: 'Texas',
    },
    intConditionForm: {
      interiorCondition: 'Mint',
      seats: '2',
      smokedIn: 'yes',
    },
    extConditionForm: {
      afterMarket: ['afterburner', 'jumpjets'],
      dents: 'yes',
      exteriorCondition: 'mint',
      hailDamage: 'yes',
      otherAfterMarket: 'shields',
      paintChipping: 'yes',
      rust: 'yes',
      scratches: 'yes',
      scratchesPanels: null,
      tiresAndWheels: 'Under 5K',
    },
    mechConditionForm: {
      additionalDetails: 'Additional details',
      floodFireDamage: 'No',
      mechanicalCondition: 'great',
      otherWarning: 'Many',
      runnable: 'Maybe',
      warningLights: 'Yes',
      warningLightsValues: ['all', 'of', 'them'],
    },
    personalInfoForm: {
      email: 'test@example.com',
      firstName: 'Guy',
      lastName: 'Fieri',
      phoneNumber: '1234567890',
    },
  };
  let store: AppraisalStore;

  beforeEach(() => {
    store = new AppraisalStore();
  });

  test('check if form is empty on init', () => {
    expect(store.isFormEmpty()).toEqual(true);
  });

  test('check if form empty on data set', () => {
    store.updateAppraisal(formInfoTestObj);
    expect(store.isFormEmpty()).toEqual(false);
  });

  test('check if show spinner is being set', () => {
    store.setShowSpinner(false);
    expect(store.showSpinner).toEqual(false);
  });

  test('check if vehicles are being set', () => {
    store.setVehicles([{ test: true }, { test2: true }]);
    expect(store.vehicles).toEqual([{ test: true }, { test2: true }]);
  });

  test('check if vehicle is being set', () => {
    store.setVehicle({ test: true });
    expect(store.vehicle).toEqual({ test: true });
  });

  test('check if vehicleId is being set', () => {
    store.setVehicleId('test vehicleId');
    expect(store.vehicleId).toEqual('test vehicleId');
  });

  test('check if vehicle error is being set', () => {
    store.setVehicleError('test error');
    expect(store.vehicleError).toEqual('test error');
  });

  test('check if checkout trade is being set', () => {
    store.setCheckoutTrade('vehicles', [{ test: true }, { test2: true }]);
    store.setCheckoutTrade('vehicle', { test: true });
    store.setCheckoutTrade('error', 'test error');
    expect(store.checkoutTrade).toEqual({
      vehicles: [{ test: true }, { test2: true }],
      vehicle: { test: true },
      error: 'test error',
    });
  });

  test('check if licence error is being set', () => {
    store.setLicenseError(true);
    expect(store.showLicenseError).toEqual(true);
  });

  test('check if vehicle decode data is being set', () => {
    store.setVehicleData({ year: 1985, model: 'Volvo', make: 'Best one' });

    expect(store.vehicleDecodeData).toEqual({
      year: 1985,
      model: 'Volvo',
      make: 'Best one',
    });
  });

  test('check if vehicle info form is being set', () => {
    store.setVehicleData({
      year: 1985,
      model: 'Volvo',
      make: 'Best one',
      zipCode: '12345',
    });

    expect(store.vehicleInfoForm).toEqual({
      year: 1985,
      model: 'Volvo',
      make: 'Best one',
      vin: '',
      exteriorColor: '',
      keysAmount: '',
      mileage: null,
      trim: '',
      vehicleOptions: [],
      zipCode: '12345',
    });
  });

  test('check if vehicle feature data is being set', () => {
    store.setVehicleFeatureData({
      year: 1985,
      model: 'Volvo',
      make: 'Best one',
      feature: 'random',
    });

    expect(store.vehicleDecodeData).toEqual({
      year: 1985,
      model: 'Volvo',
      make: 'Best one',
      feature: 'random',
    });
  });

  test('check if grade check is being set', () => {
    store.setGradeCheck({ test: true });
    expect(store.gradeCheck).toEqual({ test: true });
  });

  test('check exact milage dialog dismiss', () => {
    store.dismissExactMileageDialog();
    expect(store.showExactMileageDialog).toEqual(false);
  });

  test('check appraisal update', () => {
    store.updateAppraisal(formInfoTestObj);
    expect(store.vehicleInfoForm).toMatchObject(
      formInfoTestObj.vehicleInfoForm
    );
    expect(store.vehicleHistoryForm).toMatchObject(
      formInfoTestObj.vehicleHistoryForm
    );
    expect(store.intConditionForm).toMatchObject(
      formInfoTestObj.intConditionForm
    );
    expect(store.extConditionForm).toMatchObject(
      formInfoTestObj.extConditionForm
    );
    expect(store.mechConditionForm).toMatchObject(
      formInfoTestObj.mechConditionForm
    );
    expect(store.personalInfoForm).toMatchObject(
      formInfoTestObj.personalInfoForm
    );
    expect(store.isEmpty).toEqual(false);
  });

  test('appraisal clearing', () => {
    store.updateAppraisal(formInfoTestObj);
    store.clearAppraisal();

    expect(store.vehicleInfoForm).toMatchObject({
      vin: '',
      exteriorColor: '',
      keysAmount: '',
      make: '',
      mileage: null,
      model: '',
      trim: '',
      vehicleOptions: [],
      year: null,
      zipCode: '',
    });

    expect(store.vehicleHistoryForm).toMatchObject({
      hasAccident: '',
      titleStatus: '',
      state: '',
    });

    expect(store.personalInfoForm).toMatchObject({
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    });
    expect(store.mechConditionForm).toMatchObject({
      additionalDetails: '',
      floodFireDamage: '',
      mechanicalCondition: '',
      otherWarning: '',
      runnable: '',
      warningLights: '',
      warningLightsValues: [],
    });
    expect(store.intConditionForm).toMatchObject({
      interiorCondition: '',
      seats: '',
      smokedIn: '',
    });
    expect(store.extConditionForm).toMatchObject({
      afterMarket: [],
      dents: '',
      exteriorCondition: '',
      hailDamage: '',
      otherAfterMarket: '',
      paintChipping: '',
      rust: '',
      scratches: '',
      scratchesPanels: null,
      tiresAndWheels: 'Under 5K',
    });
    expect(store.isEmpty).toEqual(true);
  });

  test('check update general fields', () => {
    store.updateGeneralFields({
      brand: 'Not Vroom',
      dealership: 'Again, not vroom',
      type: 'Not website',
    });
    expect(
      store.brand === 'Not Vroom' &&
        store.dealership === 'Again, not vroom' &&
        store.type === 'Not website'
    ).toBeTruthy();
  });

  test('check carfax odo Last being set', () => {
    store.setCarfaxOdoLast(121);
    expect(store.carfaxOdoLast).toEqual(121);
  });

  test('check isLoggedIn being set', () => {
    store.setIsLoggedIn(true);
    expect(store.isUserLoggedIn).toEqual(true);
  });

  test('check user being set', () => {
    store.setUser({ test: true });
    expect(store.user).toEqual({ test: true });
  });
});
