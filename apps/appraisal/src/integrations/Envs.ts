const ENVS = {
  STATIC_ASSETS_HOST_URL: process.env.NEXT_PUBLIC_STATIC_ASSETS_HOST_URL || '',
  VROOM_URL: process.env.NEXT_PUBLIC_VROOM_URL || '',
  SEGMENT_WRITE_KEY: process.env.SEGMENT_WRITE_KEY || '',
  BRANCH_IO_KEY: process.env.NEXT_PUBLIC_BRANCH_IO_KEY || '',
};

export default ENVS;
