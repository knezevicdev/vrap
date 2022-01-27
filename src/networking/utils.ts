/* eslint-disable @typescript-eslint/no-explicit-any */
import { CatData } from '@vroom-web/cat-sdk';
import crypto from 'crypto';
import Cookies from 'js-cookie';

import {
  MiscParams,
  UTMParams,
  WebLeadsPayload,
  WebLeadUserData,
} from 'src/interfaces.d';

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

export function getUTMParams(is3pa?: boolean, authSrc?: string): UTMParams {
  let queryString = '';
  if (is3pa && authSrc) {
    queryString = decodeURIComponent(authSrc).split(/\?(.+)/)[1];
  } else {
    queryString = window.location.search;
  }
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

  for (const key of utmParamKeys) {
    const paramVal = urlParams.get(key);
    if (paramVal) utmObj[key as keyof UTMParams] = paramVal;
  }

  return utmObj as UTMParams;
}

export function getMiscParams(is3pa?: boolean, authSrc?: string): MiscParams {
  let queryString = '';
  if (is3pa && authSrc) {
    queryString = decodeURIComponent(authSrc).split(/\?(.+)/)[1];
  } else {
    queryString = window.location.search;
  }
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
  emailConsent,
  anonId,
  is3pa,
  authSrc,
  userState,
  userCity,
  subsite,
  correlationId,
}: WebLeadUserData): WebLeadsPayload {
  let state;
  let city;
  let sessionid;
  let site;
  if (is3pa) {
    state = userState || '';
    city = userCity || '';
    sessionid = anonId || '';
    site = 'www.vroom.com';
  } else {
    // GEO DATA
    const catGeoData: CatData = window['__CAT_DATA__'] || {};
    state = catGeoData.geo.region || '';
    city = catGeoData.geo.city || '';
    sessionid = getUuid();
    site = window.location.hostname;
  }

  // QUERY PARAMS
  const utmParams = getUTMParams(is3pa, authSrc);
  const { gclid = '', subid = '' } = getMiscParams(is3pa, authSrc);

  return {
    type: 'Website',
    tradeIn: false,
    message: {
      form: 'registration',
      brand: 'Vroom',
      site: site,
      subsite: subsite,
      ...utmParams,
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
          granted: emailConsent,
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
      webpage: 'registration',
      dealership: 'Vroom',
      subid,
      gclid,
      sessionid,
      userid: anonId,
    },
    correlationId,
  };
}
