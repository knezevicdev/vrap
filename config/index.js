const defaultConfig = require('./default.json');
const localConfig = require('./local.json');
const devConfig = require('./dev.json');
const qaConfig = require('./qa.json');
const uatConfig = require('./uat.json');
const prodConfig = require('./prod.json');

module.exports = {
  local: { ...defaultConfig, ...localConfig },
  dev: { ...defaultConfig, ...devConfig },
  qa: { ...defaultConfig, ...qaConfig },
  uat: { ...defaultConfig, ...uatConfig },
  prod: { ...defaultConfig, ...prodConfig },
};
