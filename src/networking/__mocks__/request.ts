import { Response } from '@vroom-web/networking';
import { SignInStatusResponseData } from '@vroom-web/networking';

import { Prices, VerificationRespData } from '../models/Price';

import { MileageCheckResp, PlaidTokenResp } from 'src/interfaces.d';
const offerbyIdResp: Prices = {
  data: [
    {
      Good_Until__c: '2021-09-03T00:00:00Z',
      ID: 'cb5b06d43cb95286ceeb50efc7a82e08',
      Make__c: 'NISSAN',
      Model__c: 'Murano',
      Price__c: 10854,
      Trim__c: 'Utility 4D SV 2WD V6',
      VIN__c: '5N1AZ2MG9GN133457',
      Year__c: 2016,
      active: true,
      automated_appraisal: true,
      created: '2021-08-27T19:09:21.46248Z',
      first_name: 'fname',
      last_name: 'lname',
      miles: 999999,
      new_offer: null,
      offer_id: 26300,
      offer_status: 'Pending',
      payment_method: null,
      phone: '(555) 555-5555',
      tax_credit_savings: null,
      user_email: 'doyouliketesting@testvroom.com',
      verification_url: null,
      zipcode: '12345',
    },
  ],
};

export const createVerificationData = {
  acknowledgement_of_terms: false,
  back_of_driver_license_file_id: null,
  back_of_title_lien_file_id: '53cce4a9-4c96-4dba-8d35-4ac41523a250',
  current_payments: false,
  current_registration_file_id: '22b2a420-fa36-4115-bbd3-44e298edb00d',
  exact_mileage: 999999,
  financial_institution_phone: '',
  form_state: 5,
  front_of_driver_license_file_id: 'c37cd6f6-4b3c-4748-9069-bd989ad7e3a9',
  front_of_title_lien_file_id: 'fe21cf08-f92e-41dc-b460-34a086df3f59',
  is_owner: true,
  last_four_ssn: '',
  lien_account_number: '',
  lien_financial_institution_name: '',
  lien_release_letter_file_id: 'ca322735-9cde-473e-b80b-7529fcac39e4',
  mileage_file_id: 'd6fccae0-3ec5-40db-b42f-5a92967567ed',
  offer_id: 'cb5b06d43cb95286ceeb50efc7a82e08',
  owner_email_address: 'doyouliketesting@testvroom.com',
  owner_first_name: 'fname',
  owner_last_name: 'lname',
  owner_mailing_address: {
    address_1: '123 Melrose Street',
    address_2: '',
    city: 'Brooklyn',
    state: 'NY',
    zipcode: '11206',
  },
  owner_phone_number: '(555) 555-5555',
  owners_on_title: 1,
  pickup_address: {
    address_1: '123 Melrose Street',
    address_2: '',
    city: 'Brooklyn',
    state: 'NY',
    zipcode: '11206',
  },
  pickup_contact_email: 'doyouliketesting@testvroom.com',
  pickup_contact_first_name: 'fname',
  pickup_contact_last_name: 'lname',
  pickup_contact_phone_number: '(555) 555-5555',
  same_contact_as_owner: true,
  same_mailing_address: true,
  second_owner_back_of_driver_license_file_id: null,
  second_owner_email_address: '',
  second_owner_first_name: '',
  second_owner_front_of_driver_license_file_id: null,
  second_owner_last_name: '',
  second_owner_mailing_address: {
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zipcode: '',
  },
  second_owner_phone_number: '',
};

export const verificationResp: VerificationRespData = {
  data: {
    acknowledgement_of_terms: false,
    appraisal_vehicle_id: 15,
    back_of_driver_license_file_id: null,
    back_of_title_lien_file_id: '53cce4a9-4c96-4dba-8d35-4ac41523a250',
    created: '2021-08-27T20:16:11.134494Z',
    current_payments: false,
    current_registration_file_id: '22b2a420-fa36-4115-bbd3-44e298edb00d',
    email: 'doyouliketesting@testvroom.com',
    exact_mileage: 999999,
    financial_institution_phone: '',
    form_state: 5,
    front_of_driver_license_file_id: 'c37cd6f6-4b3c-4748-9069-bd989ad7e3a9',
    front_of_title_lien_file_id: 'fe21cf08-f92e-41dc-b460-34a086df3f59',
    id: 4611,
    is_owner: true,
    last_four_ssn: null,
    lien_account_number: '',
    lien_financial_institution_name: '',
    lien_release_letter_file_id: 'ca322735-9cde-473e-b80b-7529fcac39e4',
    mileage_file_id: 'd6fccae0-3ec5-40db-b42f-5a92967567ed',
    offer_id: 'cb5b06d43cb95286ceeb50efc7a82e08',
    offer_price: 0,
    owner_email_address: 'doyouliketesting@testvroom.com',
    owner_first_name: 'fname',
    owner_last_name: 'lname',
    owner_mailing_address: {
      address_1: '123 Melrose Street',
      address_2: '',
      city: 'Brooklyn',
      state: 'NY',
      zipcode: '11206',
    },
    owner_phone_number: '(555) 555-5555',
    owners_on_title: 1,
    pickup_address: {
      address_1: '123 Melrose Street',
      address_2: '',
      city: 'Brooklyn',
      state: 'NY',
      zipcode: '11206',
    },
    pickup_contact_email: 'doyouliketesting@testvroom.com',
    pickup_contact_first_name: 'fname',
    pickup_contact_last_name: 'lname',
    pickup_contact_phone_number: '(555) 555-5555',
    poq: {
      account_number: '123456',
      final_payment: 0,
      final_payoff: 0,
    },
    same_contact_as_owner: true,
    same_mailing_address: true,
    second_owner_back_of_driver_license_file_id: null,
    second_owner_email_address: '',
    second_owner_first_name: '',
    second_owner_front_of_driver_license_file_id: null,
    second_owner_last_name: '',
    second_owner_mailing_address: {
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      zipcode: '',
    },
    second_owner_phone_number: '',
    user_id: 25289,
    vin: '',
    xke_offer_id: 26300,
  },
};

export const verificationSubmitResp: VerificationRespData = {
  data: {
    ...verificationResp.data,
    poq: {
      account_number: '123456',
      final_payment: 100,
      final_payoff: 10,
    },
  },
};

const plaidToken: PlaidTokenResp = {
  getLinkToken: {
    Expiration: '2021-06-24T23:53:23Z',
    LinkToken: 'link-sandbox-95019b12-9671-4d70-bc7f-61676874fb04',
    RequestId: 'y5mvFkVFcGFeYOJ',
  },
};

export const getOfferDetails = async (): Promise<Response<Prices>> => {
  return Promise.resolve<Response<Prices>>({
    headers: undefined,
    error: undefined,
    data: offerbyIdResp,
  });
};

export const submitPriceResponse = async (): Promise<Response<boolean>> => {
  return Promise.resolve<Response<boolean>>({
    headers: undefined,
    error: undefined,
    data: true,
  } as Response<boolean>);
};

export const getVerificationDetails = async (): Promise<
  Response<VerificationRespData>
> => {
  return Promise.resolve<Response<VerificationRespData>>({
    headers: undefined,
    error: undefined,
    data: verificationResp,
  });
};

export const submitPaymentOptionSelected = async (): Promise<
  Response<boolean>
> => {
  return Promise.resolve<Response<boolean>>({
    headers: undefined,
    error: undefined,
    data: true,
  } as Response<boolean>);
};

export const getPlaidToken = async (): Promise<Response<PlaidTokenResp>> => {
  return Promise.resolve<Response<PlaidTokenResp>>({
    headers: undefined,
    error: undefined,
    data: plaidToken,
  });
};

export const postPlaidPayment = async (): Promise<Response<boolean>> => {
  return Promise.resolve<Response<boolean>>({
    headers: undefined,
    error: undefined,
    data: true,
  } as Response<boolean>);
};

export const patchVerification = async (): Promise<
  Response<VerificationRespData>
> => {
  return Promise.resolve<Response<VerificationRespData>>({
    headers: undefined,
    error: undefined,
    data: verificationSubmitResp,
  });
};

export const getIsSignIn = async (): Promise<
  Response<SignInStatusResponseData>
> => {
  return Promise.resolve<Response<SignInStatusResponseData>>({
    headers: undefined,
    error: undefined,
    data: { status: 'invalid', reason: '' },
  });
};

export const getIsSignInInValid = async (): Promise<
  Response<SignInStatusResponseData>
> => {
  return Promise.resolve<Response<SignInStatusResponseData>>({
    headers: undefined,
    error: undefined,
    data: { status: 'active', reason: '' },
  });
};

export const getinitialOptionDetails = async (): Promise<
  Response<VerificationRespData>
> => {
  return Promise.resolve<Response<VerificationRespData>>({
    headers: undefined,
    error: undefined,
    data: verificationResp,
  });
};

export const getSubmitWeblead = async (): Promise<Response<any>> => {
  return Promise.resolve<Response<any>>({
    headers: undefined,
    error: undefined,
    data: {},
  });
};

export const getPostAppraisalReview = async (): Promise<Response<any>> => {
  return Promise.resolve<Response<any>>({
    headers: undefined,
    error: undefined,
    data: {
      ID: 'cb5b06d43cb95286ceeb50efc7a82e08',
    },
  });
};

export const getCarstoryTrimFeatures = async (): Promise<Response<any>> => {
  return Promise.resolve<Response<any>>({
    headers: undefined,
    error: undefined,
    data: {
      dataProviderInfo: {
        carstory: {
          features: ['feature_one', 'feature_two'],
        },
      },
    },
  });
};

export const gradeCheck = async (): Promise<Response<any>> => {
  return Promise.resolve<Response<any>>({
    headers: undefined,
    error: undefined,
    data: {
      grade: true,
    },
  });
};

export const getCarstoryVinDecode = async (
  data: any
): Promise<Response<any>> => {
  return Promise.resolve<Response<any>>({
    headers: undefined,
    error: undefined,
    data,
  });
};

export const getMilageCheck = async (): Promise<MileageCheckResp> => {
  return Promise.resolve<MileageCheckResp>({
    mileage: 99999,
    errorMessage: null,
  });
};
