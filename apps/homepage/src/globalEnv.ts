export interface GlobalEnv {
  GEARBOX_PRIVATE_URL?: string;
  GEARBOX_PUBLIC_URL?: string;
  INVSEARCH_V3_URL?: string;
  ASSET_PREFIX?: string;
}

declare global {
  interface Window {
    __GLOBAL_ENV__: GlobalEnv;
  }
}

const globalEnv: GlobalEnv | NodeJS.ProcessEnv = process.browser
  ? window.__GLOBAL_ENV__
  : process.env;

if (!globalEnv.ASSET_PREFIX && process.env.assetPrefix) {
  globalEnv.ASSET_PREFIX = process.env.assetPrefix;
}

export default globalEnv;
