import { NextApiRequest, NextApiResponse } from 'next';

import zips from '../../../data/zipCodes.json';

interface Zips {
  [key: number | string]: {
    city: string;
    state: string;
    lat: number;
    lng: number;
  };
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const zipCode = req.query.zipCode as string;

    const allZipCodes: Zips = zips;

    if (zipCode && /^\d{5}$/.test(zipCode)) {
      res.json({
        isZipValid: !!allZipCodes[zipCode],
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Invalid zipCode parameter.',
      });
    }
  } else {
    res.status(405);
  }
};
