import { Client } from '@vroom-web/networking';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const client = new Client(publicRuntimeConfig.GQL_PROXY_URL, {
  timeout: 4000,
  mock: !!publicRuntimeConfig.mockServer
});

export default client;
