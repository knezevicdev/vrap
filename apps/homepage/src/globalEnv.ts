export interface GlobalEnv {
  CDN_URL?: string;
  GEARBOX_PRIVATE_URL?: string;
  GEARBOX_PUBLIC_URL?: string;
  INVSEARCH_V3_URL?: string;
  SHORT_HASH?: string;
}

declare global {
  interface Window {
    __GLOBAL_ENV__: GlobalEnv;
  }
}

const globalEnv: GlobalEnv | NodeJS.ProcessEnv = process.browser
  ? window.__GLOBAL_ENV__
  : process.env;

if (globalEnv.CDN_URL && process.env.SHORT_HASH) {
  console.log(`${globalEnv.CDN_URL}/${process.env.SHORT_HASH}`);
}

export default globalEnv;
