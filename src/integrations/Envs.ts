import getConfig from 'next/config';
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const ENVS = {
  BASE_PATH: publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH || '',
  GEARBOX_PRIVATE_URL: publicRuntimeConfig.GEARBOX_PRIVATE_URL || '',
  GEARBOX_URL: publicRuntimeConfig.GEARBOX_URL || '/gql',
  DATA_DOG_RUM_APPLICATION: publicRuntimeConfig.DATA_DOG_RUM_APPLICATION || '',
  DATA_DOG_RUM_TOKEN: publicRuntimeConfig.DATA_DOG_RUM_TOKEN || '',
  VROOM_URL: publicRuntimeConfig.NEXT_PUBLIC_VROOM_URL || '',
  ACQUISITIONS_URL: publicRuntimeConfig.NEXT_PUBLIC_ACQUISITIONS_URL || '',
  STATIC_ASSETS_HOST_URL:
    publicRuntimeConfig.NEXT_PUBLIC_STATIC_ASSETS_HOST_URL || '',
  BRANCH_IO_KEY: publicRuntimeConfig.BRANCH_IO_KEY || '',
  SEGMENT_WRITE_KEY: serverRuntimeConfig.SEGMENT_WRITE_KEY || '',
  NEXT_PUBLIC_INTERCHANGE_URL:
    publicRuntimeConfig.NEXT_PUBLIC_INTERCHANGE_URL || '',
  ABSMARTLY_API_KEY: publicRuntimeConfig.ABSMARTLY_API_KEY || '',
  ABSMARTLY_APP: publicRuntimeConfig.ABSMARTLY_APP || '',
  ABSMARTLY_ENV: publicRuntimeConfig.ABSMARTLY_ENV || '',
  ABSMARTLY_URL: publicRuntimeConfig.NEXT_PUBLIC_ABSMARTLY_URL || '',
  NEXT_PUBLIC_GEARBOX_REST_URL:
    publicRuntimeConfig.NEXT_PUBLIC_GEARBOX_REST_URL || '',
};

export default ENVS;
