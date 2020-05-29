import { name, version } from 'package.json';

export interface GlobalEnv {
  CDN_URL?: string;
  INVSEARCH_V3_URL?: string;
  LEADS_URL?: string;
  NAME?: string;
  VERSION?: string;
}

declare global {
  interface Window {
    __GLOBAL_ENV__: GlobalEnv;
  }
}

const globalEnv: GlobalEnv = process.browser
  ? window.__GLOBAL_ENV__
  : { ...process.env, NAME: name, VERSION: version };

export default globalEnv;
