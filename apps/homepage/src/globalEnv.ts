export interface GlobalEnv {
  GEARBOX_PRIVATE_URL?: string;
  GEARBOX_PUBLIC_URL?: string;
  INVSEARCH_V3_URL?: string;
  CDN_URL?: string;
  SHORT_HASH?: string;
  PUBLIC_URL?: string;
}

declare global {
  interface Window {
    __GLOBAL_ENV__: GlobalEnv;
  }
}

const globalEnv: GlobalEnv | NodeJS.ProcessEnv = process.browser
  ? window.__GLOBAL_ENV__
  : process.env;

if (!globalEnv.PUBLIC_URL && globalEnv.CDN_URL && process.env.SHORT_HASH) {
  globalEnv.PUBLIC_URL = `${globalEnv.CDN_URL}/${process.env.SHORT_HASH}/public`;
}

export default globalEnv;
