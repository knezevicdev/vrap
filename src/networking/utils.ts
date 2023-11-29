/* eslint-disable @typescript-eslint/naming-convention */
import { CatData } from '@vroom-web/cat-sdk';
import crypto from 'crypto';
import Cookies from 'js-cookie';

import {
  MiscParams,
  UTMParams,
  WebLeadsPayload,
  WebLeadUserData,
} from 'src/interfaces.d';

export const checkAppraisalPayload = (req: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  zipCode: string;
  email: string;
  expectedOffer: number;
  lead_id: string;
  vin: string;
  options: string[];
}): number => {
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

export const getDummyOfferResp = (
  reqBody: {
    year: number;
    make: string;
    model: string;
    trim: string;
    mileage: number;
    vin: string;
    email: string;
  },
  goodUntil: Date,
  created: string
): any => {
  const { year, make, model, trim, mileage, vin, email } = reqBody;

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

export function saveUTMParams(): void {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const utmParamKeys: string[] = [
    'utm_campaign',
    'utm_content',
    'utm_medium',
    'utm_source',
    'utm_term',
    'utm_keyword',
    'utm_subsource',
  ];

  const utmObj: UTMParams = {
    utm_campaign: '',
    utm_content: '',
    utm_medium: '',
    utm_source: '',
    utm_term: '',
    utm_keyword: '',
    utm_subsource: '',
  };

  let hasParams = false;
  for (const key of utmParamKeys) {
    const paramVal = urlParams.get(key);
    if (paramVal && paramVal.length) {
      utmObj[key as keyof UTMParams] = paramVal;
      hasParams = true;
    }
  }

  if (hasParams) {
    window.sessionStorage.setItem(
      'VROOM_APPRAISAL_UTM_PARAMS',
      JSON.stringify(utmObj)
    );
  }
}

export function getUTMParams(): UTMParams {
  const utmParamsString = window.sessionStorage.getItem(
    'VROOM_APPRAISAL_UTM_PARAMS'
  );

  const utmObj: UTMParams = {
    utm_campaign: '',
    utm_content: '',
    utm_medium: '',
    utm_source: '',
    utm_term: '',
    utm_keyword: '',
    utm_subsource: '',
  };

  if (!utmParamsString) return utmObj;

  try {
    return JSON.parse(utmParamsString);
  } catch (e) {
    // ignore error
    return utmObj;
  }
}

export function getMiscParams(): MiscParams {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const utmParamKeys: string[] = ['gclid', 'subid'];

  const paramObj: MiscParams = {
    gclid: '',
    subid: '',
  };

  for (const key of utmParamKeys) {
    const paramVal = urlParams.get(key);
    if (paramVal) paramObj[key as keyof MiscParams] = paramVal;
  }

  return paramObj as MiscParams;
}

export function generateUUID4(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function getUuid(): string {
  const UUID_COOKIE_TIME = 730; // 2 years(days)
  const uuidCookieName = 'uuid';
  const uuidCookie = Cookies.get(uuidCookieName);

  const uuid = !uuidCookie ? generateUUID4() : uuidCookie;

  if (!uuidCookie) {
    Cookies.set(uuidCookieName, uuid, {
      expires: UUID_COOKIE_TIME,
    });
  }

  return uuid;
}

export function formWebLeadPayload({
  firstName,
  lastName,
  email,
  phone,
  subsite,
  correlationId,
}: WebLeadUserData): WebLeadsPayload {
  const anonId = Cookies.get('ajs_anonymous_id') || '';

  // GEO DATA
  const catGeoData: CatData = window['__CAT_DATA__'] || {};
  const state = catGeoData.geo.region || '';
  const city = catGeoData.geo.city || '';
  const sessionid = getUuid();
  const site = window.location.hostname;

  // QUERY PARAMS
  const { gclid = '', subid = '' } = getMiscParams();

  return {
    type: 'Website',
    tradeIn: false,
    message: {
      form: 'appraisal',
      brand: 'Vroom',
      site: site,
      subsite: subsite,
    },
    person: {
      consent: [
        {
          type: 'phone',
          granted: true,
        },
        {
          type: 'TCPA',
          granted: true,
        },
        {
          type: 'email',
          granted: false,
        },
      ],
      state,
      city,
      firstName,
      lastName,
      phone: [
        {
          type: null,
          number: phone,
        },
      ],
      email: [
        {
          type: null,
          address: email,
        },
      ],
      address: [{}],
    },
    weblead: {
      webpage: 'appraisal',
      dealership: 'Vroom',
      subid,
      gclid,
      sessionid,
      userid: anonId,
    },
    correlationId,
  };
}
