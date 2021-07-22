import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware('/api/interchange/**', {
  changeOrigin: true,
  pathRewrite: (path) => {
    console.log(path.replace('/api/interchange', ''));
    return path.replace('/api/interchange', '');
  },
  ignorePath: false,
  target: serverRuntimeConfig.INTERCHANGE_PROXY_TARGET,
});

export default proxy;
