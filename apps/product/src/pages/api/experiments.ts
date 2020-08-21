import { NextApiRequest, NextApiResponse } from 'next';

import experimentSDK from 'src/integrations/experimentSDK';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { cookies } = req;
  const marketingId = cookies['uuid'];
  const experiments = await experimentSDK.getActiveExperiments(marketingId);
  res.status(200).json(experiments);
};
