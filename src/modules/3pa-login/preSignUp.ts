import axios from 'axios';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const makePayload = (googleTokenPayload: TokenPayload) => {
  const userData = {
    username: googleTokenPayload.email,
    firstName: googleTokenPayload.given_name || 'First',
    lastName: googleTokenPayload.family_name || 'Last',
    emailMarketingConsent: true,
    smsMarketingConsent: true,
    source: 'google',
  };

  const date = new Date();
  const dateFormatted = date.toISOString();

  return {
    version: '1.0',
    source: 'appraisal',
    timestamp: dateFormatted,
    correlationId: '',
    payload: userData,
  };
};

const preSignUp = (googleTokenPayload: TokenPayload) => {
  const payload = makePayload(googleTokenPayload);

  return axios.post(
    serverRuntimeConfig.ACCT_MGMT_SERVICE_PRE_SIGNUP_ENDPOINT,
    payload
  );
};

export default preSignUp;
