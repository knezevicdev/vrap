import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware('/appraisal/api/interchange/**', {
  changeOrigin: true,
  pathRewrite: (path) => {
    return path.replace('/appraisal/api/interchange', '');
  },
  ignorePath: false,
  target: serverRuntimeConfig.INTERCHANGE_PROXY_TARGET,
});

export default proxy;
