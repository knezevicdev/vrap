import axios from 'axios';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const fetchAuthToken = (googleToken: string) => {
  const date = new Date();
  const dateFormatted = date.toISOString();

  const payload = {
    version: '1.0',
    source: 'appraisal',
    timestamp: dateFormatted,
    correlationId: '',
    payload: {
      auth_code: googleToken,
      redirect_uri: serverRuntimeConfig.GOOGLE_3PA_LOGIN_REDIRECT_URI,
    },
  };

  return axios.post(
    serverRuntimeConfig.ACCT_MGMT_SERVICE_FETCH_TOKEN_ENDPOINT,
    payload,
    {
      validateStatus: (status) => status > 0 && status < 500,
    }
  );
};

export default fetchAuthToken;
