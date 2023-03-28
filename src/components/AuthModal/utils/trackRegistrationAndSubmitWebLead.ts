import { AnalyticsHandler } from '@vroom-web/analytics-integration';
import { CatData } from '@vroom-web/cat-sdk';

import client from '../../../networking/client';
import { getUTMParams, getUuid } from '../../../networking/utils';

const trackRegistrationAndSubmitWebLead = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  externalUserId: string
) => {
  const analyticsHandler = new AnalyticsHandler();

  analyticsHandler.identify(
    {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
    },
    externalUserId
  );
  analyticsHandler.track('Create Account', {
    category: 'Account Management',
    registration_source: 'suyc',
  });

  const catGeoData: CatData = window['__CAT_DATA__'] || {};

  return client.httpRequest({
    method: 'POST',
    url: client.httpEndpoints.webleadsUrl,
    data: {
      type: 'Website',
      tradeIn: false,
      message: {
        form: 'registration',
        brand: 'Vroom',
        site: window.location.hostname,
        subsite: 'suyc',
        ...getUTMParams(),
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
            granted: true,
          },
        ],
        state: catGeoData.geo?.region || '',
        city: catGeoData.geo?.city || '',
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
        subid: '',
        gclid: '',
        sessionid: getUuid(),
        userid: analyticsHandler.getAnonymousId(),
      },
    },
  });
};

export default trackRegistrationAndSubmitWebLead;
