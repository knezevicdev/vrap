import { NextApiRequest, NextApiResponse } from 'next';

import zips from '../../../data/zipCodes.json';
import requestHandler from '../../../utils/requestHandler';

interface Zips {
  [key: number | string]: {
    city: string;
    state: string;
    lat: number;
    lng: number;
  };
}

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
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
  },
  {
    method: 'GET',
  }
);
