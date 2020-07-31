import { name, version } from 'package.json';

export interface GlobalEnv {
  ASSET_PREFIX?: string;
  DATA_DOG_LOG_COLLECTION_TOKEN?: string;
  NAME?: string;
  STATIC_ASSETS_HOST_URL?: string;
  VERSION?: string;
}

declare global {
  interface Window {
    __GLOBAL_ENV__: GlobalEnv;
  }
}

const globalEnv: GlobalEnv = process.browser
  ? window.__GLOBAL_ENV__
  : {
      ASSET_PREFIX: process.env.ASSET_PREFIX || '',
      DATA_DOG_LOG_COLLECTION_TOKEN: process.env.DATA_DOG_LOG_COLLECTION_TOKEN,
      NAME: name,
      STATIC_ASSETS_HOST_URL: process.env.STATIC_ASSETS_HOST_URL || '',
      VERSION: version,
    };

export default globalEnv;
