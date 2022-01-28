import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware('/api/weblead/attribution', {
  changeOrigin: true,
  ignorePath: true,
  target: serverRuntimeConfig.WEB_LEADS_PROXY_TARGET,
});

export default proxy;
