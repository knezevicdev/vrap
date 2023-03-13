import { execSync } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';
import packageInfo from 'package.json';

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  const gitHash = execSync('git rev-parse --short=8 HEAD').toString().trim();
  res.status(200).json({ version: packageInfo.version, hash: gitHash });
};
