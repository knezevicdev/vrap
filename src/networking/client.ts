import { Client } from '@vroom-web/networking';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const client = new Client(publicRuntimeConfig.GQL_PROXY_URL, {
  timeout: 4000,
  useMockServer: !!publicRuntimeConfig.mockServer,
  httpEndpoints: {
    interchangeUrl: publicRuntimeConfig.INTERCHANGE_URL || '',
    webleadsUrl: publicRuntimeConfig.WEB_LEADS_URL || '',
  },
});

export default client;
