import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({
      data: null,
      error: 'Method Not Allowed',
    });
    return;
  }

  try {
    const response = await axios.get(
      `${serverRuntimeConfig.APPRAISAL_API_URL}/api/v2.0/images/${req.query.vin}?uploaderType=verification`,
      {
        headers: {
          APIKEY: serverRuntimeConfig.APPRAISAL_API_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch {
    res.status(403).end();
  }
};
