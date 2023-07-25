import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

import jwt from 'jsonwebtoken';

import logger from '../../../utils/logger';
import requestHandler from '../../../utils/requestHandler';

const appraisalApiRoute = '/api/mobile/token';

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { vin } = req.query;

    logger.info(`Request to /appraisal/api/mobile/token started`, {
      appraisalApiRoute,
      request_payload: req.body,
    });

    const token = jwt.sign({ vin }, serverRuntimeConfig.JWT_SECRET_KEY, {
      expiresIn: '10m',
    });

    res.status(200).json({
      token,
    });
  },
  {
    method: 'POST',
  }
);
