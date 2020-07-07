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

// const globalEnv: GlobalEnv | NodeJS.ProcessEnv = process.browser
//   ? window.__GLOBAL_ENV__
//   : { ...process.env, NAME: name, VERSION: version };

const globalEnv: GlobalEnv = process.browser
  ? window.__GLOBAL_ENV__
  : Object.assign(
      {},
      {
        GEARBOX_PRIVATE_URL: process.env.GEARBOX_PRIVATE_URL,
        GEARBOX_PUBLIC_URL: process.env.GEARBOX_PUBLIC_URL,
        INVSEARCH_V3_URL: process.env.INVSEARCH_V3_URL,
        ASSET_PREFIX: process.env.ASSET_PREFIX || '',
        DATA_DOG_LOG_COLLECTION_TOKEN:
          process.env.DATA_DOG_LOG_COLLECTION_TOKEN,
        NAME: name,
        VERSION: version,
      }
    );

// if (!globalEnv.ASSET_PREFIX && process.env.ASSET_PREFIX) {
//   globalEnv.ASSET_PREFIX = process.env.ASSET_PREFIX;
// } else {
//   globalEnv.ASSET_PREFIX = '';
// }

export default globalEnv;
