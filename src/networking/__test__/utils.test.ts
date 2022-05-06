import Cookies from 'js-cookie';

import {
  checkAppraisalPayload,
  formWebLeadPayload,
  getDummyOfferResp,
  getMiscParams,
  getUTMParams,
  getUuid,
} from '../utils';

describe('test functions in utils', () => {
  test('test checkAppraisalPayload ', () => {
    const req = {
      firstName: 'fname',
      lastName: 'lname',
      phoneNumber: '555-555-5555',
      zipCode: '94019',
      email: 'test.test1@gmail.com',
      expectedOffer: 10000,
      lead_id: '123-d0845cbe4aa172732c2464e1177b',
      vin: 'abcded',
      options: ['Power Moonroof', 'Preferred Accessory Package', 'abc'],
    };
    const score = checkAppraisalPayload(req);
    expect(score).toEqual(11);
  });

  test('test getDummyOfferResp ', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.45);
    const reqBody = {
      year: 2010,
      make: 'Nissan',
      model: 'Rogue',
      trim: 'sport',
      mileage: 11111,
      vin: 'vin123',
      email: 'email@email.com',
    };
    const date = new Date();
    const created = date.toISOString();
    const goodUntil = new Date();
    goodUntil.setDate(goodUntil.getDate() + 7);
    const returnValue = {
      data: {
        automated_appraisal: false,
        ID: '584824b4-d392-43ff-be3a-b38885ee50f4',
        Price__c: 4555,
        Year__c: 2010,
        Make__c: 'Nissan',
        Model__c: 'Rogue',
        Trim__c: 'sport',
        miles: 11111,
        Good_Until__c: goodUntil,
        VIN__c: 'vin123',
        offer_id: 534,
        created: created,
        offer_status: 'Pending',
        user_email: 'email@email.com',
        active: true,
        new_offer: true,
        verification_url: null,
        tax_credit_savings: null,
        payment_method: null,
      },
    };
    expect(getDummyOfferResp(reqBody)).toEqual(returnValue);
  });

  test('test getUTMParams in utils ', () => {
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://test.vroom.com/appraisal',
        search: '?utm_campaign=abc&utm_source=appraisal&utm_term=12',
      },
      writable: true,
    });
    const returnObj = {
      utm_campaign: 'abc',
      utm_content: '',
      utm_medium: '',
      utm_source: 'appraisal',
      utm_term: '12',
      utm_keyword: '',
      utm_subsource: '',
    };
    expect(getUTMParams()).toEqual(returnObj);
  });

  test('test getMiscParams in uitl', () => {
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://test.vroom.com/appraisal',
        search: '?gclid=clid&subid=abc',
      },
      writable: true,
    });
    const returnValue = {
      gclid: 'clid',
      subid: 'abc',
    };
    expect(getMiscParams()).toEqual(returnValue);
  });

  test('test getUuid in utils', () => {
    Cookies.get = jest.fn().mockReturnValueOnce('abc123');
    expect(getUuid()).toEqual('abc123');
  });

  test('test formWebLeadPayload ', () => {
    const args = {
      firstName: 'fname',
      lastName: 'lname',
      email: 'email@email.com',
      phone: '555-555-8555',
      subsite: 'test.vroom.com',
      correlationId: 'correlationId123',
    };
    Object.defineProperty(window, 'location', {
      value: {
        href: 'test.vroom.com',
        search: '?gclid=clid&subid=abc',
        hostname: 'https',
      },
      writable: true,
    });
    Object.defineProperty(window, '__CAT_DATA__', {
      value: {
        geo: {
          region: '',
          city: '',
        },
      },
      writable: true,
    });

    Cookies.get = jest.fn().mockReturnValue('cookieuuid');

    const returnValue = {
      type: 'Website',
      tradeIn: false,
      message: {
        form: 'appraisal',
        brand: 'Vroom',
        site: 'https',
        subsite: 'test.vroom.com',
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
        state: '',
        city: '',
        firstName: 'fname',
        lastName: 'lname',
        phone: [
          {
            type: null,
            number: '555-555-8555',
          },
        ],
        email: [
          {
            type: null,
            address: 'email@email.com',
          },
        ],
        address: [{}],
      },
      weblead: {
        webpage: 'appraisal',
        dealership: 'Vroom',
        gclid: 'clid',
        subid: 'abc',
        sessionid: 'cookieuuid',
        userid: 'cookieuuid',
      },
      correlationId: 'correlationId123',
    };
    expect(formWebLeadPayload(args)).toEqual(returnValue);
  });
});
