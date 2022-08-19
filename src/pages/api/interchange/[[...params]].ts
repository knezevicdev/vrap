import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const resolveAccessToken = (str: string) => {
  try {
    const cookies = str
      .split(';')
      .map((v) => v.split('='))
      .reduce((acc: Record<string, string>, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {});

    const authToken = cookies.authToken;

    const firstIndex = authToken.indexOf('"accessToken":"') + 15;
    const lastIndexOf = authToken.indexOf('"', firstIndex);

    return authToken.substr(firstIndex, lastIndexOf - firstIndex);
  } catch (e) {
    return '';
  }
};

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
  onProxyReq(proxyReq, req: any) {
    if (
      !proxyReq.getHeader('authorization') &&
      req.headers &&
      req.headers.cookie
    ) {
      const accessToken = resolveAccessToken(req.headers.cookie);
      if (accessToken) {
        proxyReq.setHeader('authorization', accessToken);
      }
    }
  },
});

export default proxy;
