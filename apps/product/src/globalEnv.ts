import { name, version } from 'package.json';

export interface GlobalEnv {
  INVSEARCH_V3_URL?: string;
  LEADS_URL?: string;
  NAME?: string;
  VERSION?: string;
  ASSET_PREFIX?: string;
}

declare global {
  interface Window {
    __GLOBAL_ENV__: GlobalEnv;
  }
}

const globalEnv: GlobalEnv = process.browser
  ? window.__GLOBAL_ENV__
  : { ...process.env, NAME: name, VERSION: version };

if (!globalEnv.ASSET_PREFIX && process.env.assetPrefix) {
  globalEnv.ASSET_PREFIX = process.env.assetPrefix;
}

export default globalEnv;
