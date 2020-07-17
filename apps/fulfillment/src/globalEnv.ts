import { name, version } from 'package.json';

export interface GlobalEnv {
  ASSET_PREFIX?: string;
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
      NAME: name,
      VERSION: version,
      ASSET_PREFIX: process.env.ASSET_PREFIX,
    };

export default globalEnv;
