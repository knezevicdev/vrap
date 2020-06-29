import { name, version } from 'package.json';

export interface GlobalEnv {
  CDN_URL?: string;
  INVSEARCH_V3_URL?: string;
  NAME?: string;
  VERSION?: string;
  SHORT_HASH?: string;
}

declare global {
  interface Window {
    __GLOBAL_ENV__: GlobalEnv;
  }
}

const globalEnv: GlobalEnv | NodeJS.ProcessEnv = process.browser
  ? window.__GLOBAL_ENV__
  : { ...process.env, NAME: name, VERSION: version };

if (globalEnv.CDN_URL && process.env.SHORT_HASH) {
  globalEnv.CDN_URL = `${globalEnv.CDN_URL}/${process.env.SHORT_HASH}`;
}

export default globalEnv;
