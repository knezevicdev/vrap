import { NextApiRequest, NextApiResponse } from 'next';
import { version } from 'package.json';

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ version });
};
