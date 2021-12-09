/* eslint-disable @typescript-eslint/no-explicit-any */
export const checkAppraisalPayload = (req: any): number => {
  const {
    firstName,
    lastName,
    phoneNumber,
    zipCode,
    email,
    expectedOffer,
    lead_id,
    vin,
    options,
  } = req;
  const emailRegex = /^[A-Z-a-z]+\.[A-Z-a-z]+[0-9]+@gmail\.com/;
  const vinRegex = /[a-z]/g;
  const cleanLeadId = lead_id.replace(/-/g, '');
  const redFlagOptions = ['Power Moonroof', 'Preferred Accessory Package'];
  const hasRedFlagOptions = redFlagOptions.every((val) =>
    options.includes(val)
  );
  const rawPhoneNumber = phoneNumber.replace(/[^\w]/g, '');
  let score = 0;

  if (zipCode === '94019' || zipCode === '94025') {
    score++;
  }

  if (hasRedFlagOptions) {
    score++;
  }

  if (emailRegex.test(email)) {
    score++;
  }

  if (expectedOffer === 10000) {
    score++;
  }

  // if (typeof ajsanonymousid === 'undefined') {
  //   score++;
  // }

  if (cleanLeadId.length !== 32) {
    score = score + 3;
  }

  if (cleanLeadId.includes('d0845cbe4aa172732c2464e1177b')) {
    score++;
  }

  if (vin.match(vinRegex)) {
    score = score + 3;
  }

  if (
    firstName.toLowerCase() === 'wayne' &&
    lastName.toLowerCase() === 'ireland' &&
    rawPhoneNumber === '2079655257' &&
    email.toLowerCase() === 'wayneici11@gmail.com' &&
    zipCode === '04414'
  ) {
    score = score + 3;
  }

  return score;
};

export const getDummyOfferResp = (reqBody: any): any => {
  const { year, make, model, trim, mileage, vin, email } = reqBody;
  const date = new Date();
  const created = date.toISOString();
  const goodUntil = new Date();
  goodUntil.setDate(goodUntil.getDate() + 7);

  const priceMin = Math.ceil(100);
  const priceMax = Math.floor(10000);
  const randPrice = Math.floor(
    Math.random() * (priceMax - priceMin + 1) + priceMin
  );

  return {
    data: {
      automated_appraisal: false,
      ID: '584824b4-d392-43ff-be3a-b38885ee50f4',
      Price__c: randPrice,
      Year__c: year,
      Make__c: make,
      Model__c: model,
      Trim__c: trim,
      miles: mileage,
      Good_Until__c: goodUntil,
      VIN__c: vin,
      offer_id: 534,
      created: created,
      offer_status: 'Pending',
      user_email: email,
      active: true,
      new_offer: true,
      verification_url: null,
      tax_credit_savings: null,
      payment_method: null,
    },
  };
};
