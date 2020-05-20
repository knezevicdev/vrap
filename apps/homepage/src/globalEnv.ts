export interface GlobalEnv {
  CDN_URL?: string;
  INVSEARCH_V3_URL?: string;
}

declare global {
  interface Window {
    __GLOBAL_ENV__: GlobalEnv;
  }
}

const globalEnv: GlobalEnv | NodeJS.ProcessEnv = process.browser
  ? window.__GLOBAL_ENV__
  : process.env;

export default globalEnv;
