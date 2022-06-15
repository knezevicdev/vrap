import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware('/appraisal/api/weblead/attribution', {
  changeOrigin: true,
  ignorePath: true,
  pathRewrite: (path) => {
    return path.replace('/appraisal', '');
  },
  target: serverRuntimeConfig.WEB_LEADS_PROXY_TARGET,
});

export default proxy;
