let globalConfig =
  typeof window === 'undefined' ? process.env : window.__GLOBAL_CONFIG__ || {};

export { globalConfig };
