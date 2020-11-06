import getConfig from 'next/config';
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const ENVS = {
  BASE_PATH: publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH || '',
  GEARBOX_PRIVATE_URL:
    publicRuntimeConfig.NEXT_PUBLIC_GEARBOX_PRIVATE_URL || '',
  DATA_DOG_RUM_APPLICATION:
    publicRuntimeConfig.NEXT_PUBLIC_DATA_DOG_RUM_APPLICATION || '',
  DATA_DOG_RUM_TOKEN: publicRuntimeConfig.NEXT_PUBLIC_DATA_DOG_RUM_TOKEN || '',
  VROOM_URL: publicRuntimeConfig.NEXT_PUBLIC_VROOM_URL || '',
  STATIC_ASSETS_HOST_URL:
    publicRuntimeConfig.NEXT_PUBLIC_STATIC_ASSETS_HOST_URL || '',
  BRANCH_IO_KEY: publicRuntimeConfig.NEXT_PUBLIC_BRANCH_IO_KEY || '',
  SEGMENT_WRITE_KEY: serverRuntimeConfig.SEGMENT_WRITE_KEY || '',
};

export default ENVS;
