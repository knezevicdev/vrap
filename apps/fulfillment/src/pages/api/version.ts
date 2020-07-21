import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const { VERSION, SHORT_HASH } = getConfig().publicRuntimeConfig;

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ version: VERSION, hash: SHORT_HASH });
};
