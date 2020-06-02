import { name, version } from 'package.json';

export interface GlobalEnv {
  CDN_URL: string;
  INVSEARCH_V3_URL: string;
  NAME: string;
  VERSION: string;
}

declare global {
  interface Window {
    __GLOBAL_ENV__: GlobalEnv;
  }
}

function getGlobalEnv(): GlobalEnv {
  if (process.browser) {
    return window.__GLOBAL_ENV__;
  }
  if (typeof process.env.CDN_URL === 'undefined') {
    throw new Error('process.env.CDN_URL is undefined!');
  }
  if (typeof process.env.INVSEARCH_V3_URL === 'undefined') {
    throw new Error('process.env.INVSEARCH_V3_URL is undefined!');
  }
  return {
    CDN_URL: process.env.CDN_URL,
    INVSEARCH_V3_URL: process.env.INVSEARCH_V3_URL,
    NAME: name,
    VERSION: version,
  };
}

const globalEnv: GlobalEnv = getGlobalEnv();

export default globalEnv;
