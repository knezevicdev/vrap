import { execSync } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';
import { version } from 'package.json';

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  const gitHash = execSync('git rev-parse --short=8 HEAD').toString().trim();
  res.status(200).json({ version, hash: gitHash });
};
