import { name, version } from 'package.json';

export interface GlobalEnv {
  ASSET_PREFIX?: string;
  DATA_DOG_LOG_COLLECTION_TOKEN?: string;
  GEARBOX_PRIVATE_URL?: string;
  GEARBOX_PUBLIC_URL?: string;
  INVSEARCH_V3_URL?: string;
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
  : {
      ASSET_PREFIX: process.env.ASSET_PREFIX || '',
      DATA_DOG_LOG_COLLECTION_TOKEN: process.env.DATA_DOG_LOG_COLLECTION_TOKEN,
      GEARBOX_PRIVATE_URL: process.env.GEARBOX_PRIVATE_URL,
      GEARBOX_PUBLIC_URL: process.env.GEARBOX_PUBLIC_URL,
      INVSEARCH_V3_URL: process.env.INVSEARCH_V3_URL,
      NAME: name,
      VERSION: version,
    };

export default globalEnv;
