/* eslint-disable @typescript-eslint/no-var-requires */

const { name, version } = require('./package.json');

const childProcess = require('child_process');
const shortHash = childProcess
  .execSync('git rev-parse --short=8 HEAD')
  .toString()
  .trim();

const basePath = '/checkout';

const endPointSelector = () => {
  
  if(process.env.NODE_ENV === 'production'){
    return 'gql'
  }
  return `${basePath}/api/gql`
}

const config = {
  basePath,
  distDir: `.next/${shortHash}`,
  generateBuildId: () => shortHash,
  publicRuntimeConfig: {
    // Will be available on both server-side and client-side
    BASE_PATH: basePath,
    DATA_DOG_RUM_APPLICATION: process.env.DATA_DOG_RUM_APPLICATION,
    DATA_DOG_RUM_TOKEN: process.env.DATA_DOG_RUM_TOKEN,
    GQL_PROXY_URL: endPointSelector(),
    mockServer: process.env.mockServer,
    GEARBOX_PRIVATE_URL: process.env.GEARBOX_PRIVATE_URL,
    NAME: name,
    NODE_ENV: process.env.NODE_ENV,
    VERSION: version,
  },
  serverRuntimeConfig: {
    GQL_PROXY_TARGET: process.env.GQL_PROXY_TARGET,
    SEGMENT_WRITE_KEY: process.env.SEGMENT_WRITE_KEY,
  },
};

module.exports = config;
