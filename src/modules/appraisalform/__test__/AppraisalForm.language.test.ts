import * as lang from '../AppraisalForm.language';

describe('appraisal form language test', () => {
  test('test const', () => {
    expect(lang.DealFormTitleText).toEqual('my trade-in vehicle  information');
    expect(lang.SellFormTitleText).toEqual('My Appraisal');
    expect(lang.CancelTradeText).toEqual('CANCEL TRADE-IN, CONTINUE PURCHASE');

    expect(lang.VehicleInfoText).toEqual({
      title: 'Vehicle Information',
      timeEst: '(Step 1 of 6)',
      noYearMakeModel: 'we could not find that vin. please try again.',
      licenseButton: `WHAT'S MY CAR WORTH?`,
      licenseError: 'Please enter a valid license plate number',
      licenseButtonDataQa: 'appraisal license button',
      vinError: 'Please enter a valid vin'
    });``

    expect(lang.VehicleInfoLeaseCopy).toEqual(
      'Please note: we do not purchase leased vehicles.'
    );

    expect(lang.VehicleHistoryText).toEqual({
      title: 'Vehicle History',
      timeEst: '(Step 2 of 6)',
      subTitle: '',
    });

    expect(lang.IntConditionText).toEqual({
      title: 'Interior Condition',
      timeEst: '(Step 3 of 6)',
    });

    expect(lang.ExtConditionText).toEqual({
      title: 'Exterior Condition',
      timeEst: '(Step 4 of 6)',
    });

    expect(lang.MechConditionText).toEqual({
      title: 'Mechanical Condition',
      timeEst: '(Step 5 of 6)',
    });

    expect(lang.PersonalInfoText).toEqual({
      title: 'Your Information',
      timeEst: '(Step 6 of 6)',
    });
    expect(lang.AppraisalTitle).toEqual(
      'Vroom will verify that the vehicle information you provide is accurate during pickup. Inaccurate information may result in a reduced price or canceled appraisal.'
    );
    expect(lang.SaveText).toEqual('Save');
    expect(lang.ReviewText).toEqual('Review');
  });
});
