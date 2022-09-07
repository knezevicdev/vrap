import AnalyticsHandler from '../AnalyticsHandler';

const formData = {
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
  },
  vehicleHistoryForm: {
    hasAccident: 'No accident',
    titleStatus: 'Title status',
    whichStatePurchase: 'Texas',
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
    tiresAndWheels: '5k',
    dentPanels: '2',
    paintChippingPanels: '3',
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
    zipCode: '12345',
  },
};

describe('test AnalyticsHandler ', () => {
  const analytics: AnalyticsHandler = new AnalyticsHandler();
  const pageSpy = jest.spyOn(analytics, 'page');
  const trackSpy = jest.spyOn(analytics, 'track');
  const identifySpy = jest.spyOn(analytics, 'identify');

  it('test trackPriceViewed ', () => {
    analytics.trackPriceViewed();
    expect(pageSpy).toHaveBeenCalledWith('Price details', 'sell');
  });

  it('test trackCongratsViewed ', () => {
    analytics.trackCongratsViewed();
    expect(pageSpy).toHaveBeenCalledWith('Congratulations Page', 'sell');
  });

  it('test trackPriceAutomated ', () => {
    analytics.trackPriceAutomated();
    const cotegory = { category: 'sell' };
    expect(trackSpy).toHaveBeenCalledWith('Automated Price', cotegory);
  });

  it('test trackNoPrice ', () => {
    analytics.trackNoPrice();
    const cotegory = { category: 'sell' };
    expect(trackSpy).toHaveBeenCalledWith('No Price', cotegory);
  });

  it('test trackContinueClick ', () => {
    analytics.trackContinueClick();
    const cotegory = { category: 'sell' };
    expect(trackSpy).toHaveBeenCalledWith('Appraisal Offer Accepted', cotegory);
  });

  it('test trackPaymentOptionsViewed ', () => {
    analytics.trackPaymentOptionsViewed();
    expect(pageSpy).toHaveBeenCalledWith('Payment Method', 'Verification');
  });

  it('test trackPaymentOptionsSubmitted ', () => {
    analytics.trackPaymentOptionsSubmitted('check');
    const properties = { category: 'Verification', label: 'check' };
    expect(trackSpy).toHaveBeenCalledWith(
      'Payment Method Submitted',
      properties
    );
  });

  it('test trackPlaidACHSelected ', () => {
    analytics.trackPlaidACHSelected();
    const cotegory = { category: 'Verification' };
    expect(trackSpy).toHaveBeenCalledWith('Plaid ACH Selected', cotegory);
  });

  it('test trackManualACHSelected ', () => {
    analytics.trackManualACHSelected();
    const cotegory = { category: 'Verification' };
    expect(trackSpy).toHaveBeenCalledWith('Manual ACH Selected', cotegory);
  });

  it('test trackCheckSelected ', () => {
    analytics.trackCheckSelected();
    const cotegory = { category: 'Verification' };
    expect(trackSpy).toHaveBeenCalledWith('Check Selected', cotegory);
  });

  it('test trackVerificationReviewViewed ', () => {
    analytics.trackVerificationReviewViewed();
    expect(pageSpy).toHaveBeenCalledWith('Verification Review', 'verification');
  });

  it('test trackVerificationSubmitted ', () => {
    const email = 'test@test.com';
    const firstName = 'fname';
    const category = 'verification';
    analytics.trackVerificationSubmitted(email, firstName);
    const properties = { email, 'Account.FirstName': firstName, category };
    expect(trackSpy).toHaveBeenCalledWith('Verification Submitted', properties);
  });

  it('test trackLicenseToVin ', () => {
    const label = 'vin';
    const category = 'sell';
    analytics.trackLicenseToVin(label, category);
    const properties = { label, category };
    expect(trackSpy).toHaveBeenCalledWith(
      `What's My Car Worth? Clicked`,
      properties
    );
  });

  it('test trackSelectYourVehicle ', () => {
    const category = 'sell';
    analytics.trackSelectYourVehicle(category);
    const properties = { category };
    expect(trackSpy).toHaveBeenCalledWith(
      'Select Your Vehicle Viewed',
      properties
    );
  });

  it('test trackMileageChange ', () => {
    const event = 'Mileage Entered';
    const category = 'Sell';
    const action = 'Click';
    analytics.trackMileageChange(category);
    const properties = { action, category };
    expect(trackSpy).toHaveBeenCalledWith(event, properties);
  });

  it('test trackColorChange ', () => {
    const event = 'Color Selected';
    const category = 'Sell';
    const action = 'Click';
    const properties = { action, category };
    analytics.trackColorChange(category);

    expect(trackSpy).toHaveBeenCalledWith(event, properties);
  });

  it('test trackNumberOfKeysChange ', () => {
    const event = 'Keys Selected';
    const category = 'Sell';
    const action = 'Click';
    const properties = { action, category };

    analytics.trackNumberOfKeysChange(category);

    expect(trackSpy).toHaveBeenCalledWith(event, properties);
  });

  it('test trackTrimChange ', () => {
    const event = 'Trim Selected';
    const category = 'Sell';
    const action = 'Click';
    const properties = { action, category };

    analytics.trackTrimChange(category);

    expect(trackSpy).toHaveBeenCalledWith(event, properties);
  });

  it('test trackProcessStart ', () => {
    const category = 'Sell';
    const properties = { category };
    const event = 'Appraisal Started';
    const nameSection = 'Vehicle Information';

    analytics.trackProcessStart(category);

    expect(trackSpy).toHaveBeenCalledWith(event, properties);
    expect(pageSpy).toHaveBeenCalledWith(nameSection, category);
  });

  it('test trackStepComplete ', () => {
    const event = 'Exterior Conditions Completed';
    const category = 'Sell';
    const details = {
      'Signs of Rust': formData.extConditionForm.rust,
      Dents: formData.extConditionForm.dents,
      'Dents Panels': formData.extConditionForm.dentPanels,
      'Paint Chipping': formData.extConditionForm.paintChipping,
      'Paint Chipping Panels': formData.extConditionForm.paintChippingPanels,
      Scratches: formData.extConditionForm.scratches,
      'Scratches Panels': formData.extConditionForm.scratchesPanels,
      Modifications: formData.extConditionForm.afterMarket,
      'Other Modifications': formData.extConditionForm.otherAfterMarket,
    };
    const properties = {
      category,
      ...details,
    };

    analytics.trackStepComplete(3, formData, category);

    expect(trackSpy).toHaveBeenCalledWith(event, properties);
  });

  it('test trackStepComplete with stpe = 2', () => {
    const event = 'Interior Conditions Completed';
    const category = 'Sell';
    const details = {};
    const properties = {
      category,
      ...details,
    };

    analytics.trackStepComplete(2, formData, category);

    expect(trackSpy).toHaveBeenCalledWith(event, properties);
  });

  it('trackNextStepViewed', () => {
    const pageName = 'Interior Conditions Viewed';
    const category = 'Sell';

    analytics.trackNextStepViewed(2);

    expect(pageSpy).toHaveBeenCalledWith(pageName, category);
  });

  it('trackAppraisalReviewViewed', () => {
    const pageName = 'Appraisal Review';
    const category = 'Sell';
    analytics.trackAppraisalReviewViewed(category);

    expect(pageSpy).toHaveBeenCalledWith(pageName, category);
  });

  it(' test trackIntentQuestion', () => {
    const category = 'Sell';
    const event = `Why Are You Here Completed`;
    const properties = {
      category,
      label: 'Yes',
    };
    analytics.trackIntentQuestion('Yes');

    expect(trackSpy).toHaveBeenCalledWith(event, properties);
  });

  it('test trackPanelsTooltip', () => {
    const category = 'Sell';
    const event = `Tool Tip Clicked`;
    const damageType = 'Dent';
    const properties = {
      category,
      label: damageType,
    };
    analytics.trackPanelsTooltip(damageType, category);

    expect(trackSpy).toHaveBeenCalledWith(event, properties);
  });

  it('test tracksEmailCapture', () => {
    const category = 'sell';
    const trackObj = {
      eventName: 'Remind Me Viewed',
      category,
      loggedIn: true,
      mobile: 1,
      nonInteraction: 1,
      result: true,
    };
    analytics.tracksEmailCapture('Remind Me Viewed', true, 1, 1, true);

    expect(trackSpy).toHaveBeenCalledWith('Remind Me Viewed', trackObj);
  });

  it('test tracksEmailCapture with result false', () => {
    const category = 'sell';
    const trackObj = {
      eventName: 'Remind Me Viewed',
      category,
      loggedIn: true,
      mobile: 1,
      nonInteraction: 1,
    };
    analytics.tracksEmailCapture('Remind Me Viewed', true, 1, 1, false);

    expect(trackSpy).toHaveBeenCalledWith('Remind Me Viewed', trackObj);
  });

  it('test trackAppraisalIdentify with userId ', () => {
    const appraisalData = {
      firstName: 'fname',
      lastName: 'lname',
      email: 'email@email.com',
      phone: '333-222-1111',
      phoneNumber: '222-333-1111',
      address: '123 main st',
      city: 'New York',
      state: 'NY',
      zip: '10023',
      zipCode: '10023',
      subID: 'sub 123',
      username: 'username',
    };

    const address = {
      street: '123 main st',
      city: 'New York',
      state: 'NY',
      postalCode: '10023',
      country: 'USA',
    };

    analytics.trackAppraisalIdentify('userId123', appraisalData);
    expect(identifySpy).toHaveBeenCalledWith(
      {
        firstName: 'fname',
        lastName: 'lname',
        phone: '333-222-1111',
        email: 'email@email.com',
        address,
        subID: 'sub 123',
      },
      'userId123'
    );
  });

  it('test trackAppraisalIdentify without userId ', () => {
    const appraisalData = {
      firstName: 'fname',
      lastName: 'lname',
      email: 'email@email.com',
      phone: '333-222-1111',
      phoneNumber: '222-333-1111',
      address: '123 main st',
      city: 'New York',
      state: 'NY',
      zip: '10023',
      zipCode: '10023',
      subID: 'sub 123',
      username: 'username',
    };

    const address = {
      street: '123 main st',
      city: 'New York',
      state: 'NY',
      postalCode: '10023',
      country: 'USA',
    };

    analytics.trackAppraisalIdentify(null, appraisalData);
    expect(identifySpy).toHaveBeenCalledWith({
      firstName: 'fname',
      lastName: 'lname',
      phone: '333-222-1111',
      email: 'email@email.com',
      address,
      subID: 'sub 123',
    });
  });
});
