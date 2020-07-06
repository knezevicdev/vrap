import { name, version } from 'package.json';

export interface GlobalEnv {
  GEARBOX_PRIVATE_URL?: string;
  GEARBOX_PUBLIC_URL?: string;
  INVSEARCH_V3_URL?: string;
  ASSET_PREFIX?: string;
  DATA_DOG_LOG_COLLECTION_TOKEN?: string;
  NAME?: string;
  VERSION?: string;
}

declare global {
  interface Window {
    __GLOBAL_ENV__: GlobalEnv;
  }
}

const globalEnv: GlobalEnv | NodeJS.ProcessEnv = process.browser
  ? window.__GLOBAL_ENV__
  : { ...process.env, NAME: name, VERSION: version };

if (!globalEnv.ASSET_PREFIX && process.env.ASSET_PREFIX) {
  globalEnv.ASSET_PREFIX = process.env.ASSET_PREFIX;
}

export default globalEnv;
