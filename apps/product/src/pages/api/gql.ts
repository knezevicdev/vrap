import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware('/api/gql', {
  changeOrigin: true,
  ignorePath: true,
  target: serverRuntimeConfig.GQL_PROXY_TARGET,
});

export default proxy;
