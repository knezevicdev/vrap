import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import logger from '../../../../utils/logger';
import requestHandler from '../../../../utils/requestHandler';

const { serverRuntimeConfig } = getConfig();

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (typeof req.body.image !== 'string') {
      res.status(403).end();
      return;
    }

    try {
      const response = await axios.delete(
        `${serverRuntimeConfig.APPRAISAL_API_URL}/api/v2.0/images/${req.query.vin}?uploaderType=verification`,
        {
          headers: {
            APIKEY: serverRuntimeConfig.APPRAISAL_API_API_KEY,
          },
          data: [req.body.image],
        }
      );

      res.json(response.data);
    } catch (error) {
      logger.error('Error while deleting photo', { error });
      res.status(403).end();
    }
  },
  {
    method: 'DELETE',
  }
);
