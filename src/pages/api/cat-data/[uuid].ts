import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware('/api/cat-data/**', {
  changeOrigin: true,
  pathRewrite: (path) => {
    return path.replace('/api/cat-data', '');
  },
  ignorePath: false,
  target: serverRuntimeConfig.CAT_DATA_PROXY_TARGET,
});

export default proxy;
