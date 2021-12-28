import { isUndefined } from 'lodash';

export const createVerificationPayload = reqBody => {
  const payload = {};
  const ownerInfo = reqBody.ownerInfo || {};
  const pickupInfo = reqBody.pickupInfo || {};
  const payoffInfo = reqBody.payoffInfo || {};
  const documents = reqBody.documents || [];

  // payload.user_id = 12,
  // payload.appraisal_vehicle_id = 24,
  payload.form_state = reqBody.formState;
  payload.offer_id = reqBody.offer_id;

  //Owner Info
  if (reqBody.ownerInfo) {
    let ownersOnTitle = 1;
    if (ownerInfo.secondaryOwner === 'Yes') ownersOnTitle++;
    payload.is_owner =
      ownerInfo.primaryOwner !== ''
        ? ownerInfo.primaryOwner === 'Yes'
        : undefined;
    payload.owner_first_name = ownerInfo.primaryFirst;
    payload.owner_last_name = ownerInfo.primaryLast;

    if (!isUndefined(ownerInfo.primaryAddress)) {
      payload.owner_mailing_address = {
        city: ownerInfo.primaryCity,
        state: ownerInfo.primaryState,
        zipcode: ownerInfo.primaryZip,
        address_1: ownerInfo.primaryAddress,
        address_2: ownerInfo.primaryApartment
      };
    }

    payload.owner_phone_number = ownerInfo.primaryPhone;
    payload.owner_email_address = ownerInfo.primaryEmail;
    payload.owners_on_title = ownersOnTitle;
    payload.second_owner_first_name = ownerInfo.secondaryFirst;
    payload.second_owner_last_name = ownerInfo.secondaryLast;

    if (!isUndefined(ownerInfo.secondaryAddress)) {
      payload.second_owner_mailing_address = {
        city: ownerInfo.secondaryCity,
        state: ownerInfo.secondaryState,
        zipcode: ownerInfo.secondaryZip,
        address_1: ownerInfo.secondaryAddress,
        address_2: ownerInfo.secondaryApartment
      };
    }

    payload.second_owner_phone_number = ownerInfo.secondaryPhone;
    payload.second_owner_email_address = ownerInfo.secondaryEmail;
  }
  //Pickup Info
  if (reqBody.pickupInfo) {
    payload.same_mailing_address =
      pickupInfo.primaryPickup !== ''
        ? pickupInfo.primaryPickup === 'Yes'
        : undefined;

    if (!isUndefined(pickupInfo.pickupAddress)) {
      payload.pickup_address = {
        city: pickupInfo.pickupCity,
        state: pickupInfo.pickupState,
        zipcode: pickupInfo.pickupZip,
        address_1: pickupInfo.pickupAddress,
        address_2: pickupInfo.pickupApartment
      };
    }

    payload.same_contact_as_owner =
      pickupInfo.poc !== '' ? pickupInfo.poc === 'Yes' : undefined;
    payload.pickup_contact_first_name = pickupInfo.pocFirst;
    payload.pickup_contact_last_name = pickupInfo.pocLast;
    payload.pickup_contact_phone_number = pickupInfo.pocPhone;
    payload.pickup_contact_email = pickupInfo.pocEmail;
  }

  //Payoff Info
  if (reqBody.payoffInfo) {
    payload.current_payments =
      payoffInfo.currentPayments !== ''
        ? payoffInfo.currentPayments === 'Yes'
        : undefined;

    const { bankName, lienFinancialInstitutionName } = payoffInfo;
    if (bankName && bankName.value !== 'Other') {
      payload.lien_financial_institution_name = bankName.value;
    } else {
      payload.lien_financial_institution_name = lienFinancialInstitutionName;
    }

    payload.lender_id = payoffInfo.lenderId;
    payload.lender_name = bankName.value;
    payload.financial_institution_phone = payoffInfo.bankPhoneNumber;
    payload.lien_account_number = payoffInfo.loanAccountNumber;
    payload.last_four_ssn = payoffInfo.lastFourSSN;
    payload.acknowledgement_of_terms =
      payoffInfo.termsCheckbox === '' ? false : payoffInfo.termsCheckbox;
  }

  //Doc Upload Page
  payload.exact_mileage = reqBody.exactMileage;

  const odo = documents.find(doc => doc.fileType === 'odometer-information');
  const titleFront = documents.find(
    doc => doc.fileType === 'title-information-front'
  );
  const titleBack = documents.find(
    doc => doc.fileType === 'title-information-back'
  );
  const driverFront = documents.find(
    doc => doc.fileType === 'drivers-license-front'
  );
  const driverBack = documents.find(
    doc => doc.fileType === 'drivers-license-back'
  );
  const secondDriverFront = documents.find(
    doc => doc.fileType === 'second-drivers-license-front'
  );
  const secondDriverBack = documents.find(
    doc => doc.fileType === 'second-drivers-license-back'
  );
  const reg = documents.find(doc => doc.fileType === 'registration');
  const lienRelease = documents.find(
    doc => doc.fileType === 'lien-release-letter'
  );

  //this section looks crazy but it ensures no accidental deletes
  if (odo) {
    payload.mileage_file_id = odo.id;
  }

  if (titleFront) {
    payload.front_of_title_lien_file_id = titleFront.id;
  }

  if (titleBack) {
    payload.back_of_title_lien_file_id = titleBack.id;
  }

  if (driverFront) {
    payload.front_of_driver_license_file_id = driverFront.id;
  }

  if (driverBack) {
    payload.back_of_driver_license_file_id = driverBack.id;
  }

  if (secondDriverFront) {
    payload.second_owner_front_of_driver_license_file_id = secondDriverFront.id;
  }

  if (secondDriverBack) {
    payload.second_owner_back_of_driver_license_file_id = secondDriverBack.id;
  }

  if (reg) {
    payload.current_registration_file_id = reg.id;
  }

  if (lienRelease) {
    payload.lien_release_letter_file_id = lienRelease.id;
  }

  return payload;
};

export const checkAppraisalPayload = req => {
  const {
    firstName,
    lastName,
    phoneNumber,
    zipCode,
    email,
    expectedOffer,
    lead_id,
    vin,
    options
  } = req;
  const emailRegex = /^[A-Z-a-z]+\.[A-Z-a-z]+[0-9]+@gmail\.com/;
  const vinRegex = /[a-z]/g;
  const cleanLeadId = lead_id.replace(/-/g, '');
  const redFlagOptions = ['Power Moonroof', 'Preferred Accessory Package'];
  const hasRedFlagOptions = redFlagOptions.every(val => options.includes(val));
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

  if (typeof ajsanonymousid === 'undefined') {
    score++;
  }

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

export const getDummyOfferResp = reqBody => {
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
      payment_method: null
    }
  };
};
