import { name, version } from 'package.json';

export interface GlobalEnv {
  ASSET_PREFIX?: string;
  INVSEARCH_V3_URL?: string;
  INV_SERVICE_V2_URL?: string;
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
      INVSEARCH_V3_URL: process.env.INVSEARCH_V3_URL,
      INV_SERVICE_V2_URL: process.env.INV_SERVICE_V2_URL,
      NAME: name,
      STATIC_ASSETS_HOST_URL: process.env.STATIC_ASSETS_HOST_URL || '',
      VERSION: version,
    };

export default globalEnv;
