import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import { AppraisalPayload } from '../../../interfaces.d';
import { checkSignature } from '../../../utils/checkBotActivity';
import logger from '../../../utils/logger';
import requestHandler from '../../../utils/requestHandler';

const { serverRuntimeConfig } = getConfig();

const appraisalApiRoute = '/api/appraisal';

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const payload = req.body;

    if (!checkSignature(req, 'vin')) {
      logger.warn(`Bot activity detected [mobile].`, {
        appraisalApiRoute,
        request_payload: req.body,
        referrer: req.headers.referer || req.headers.referrer,
        user_agent: req.headers['user-agent'],
        signature: req.headers['x-signature'],
        token: req.headers['x-token'],
      });
      res.status(400).end();
      return;
    }

    try {
      const { data } = await postAppraisal(payload);

      logger.info(`Successful response from /v1/acquisition/appraisal`, {
        appraisalApiRoute,
        response: data,
      });
      res.status(200).json(data);
    } catch (err: any) {
      const message = `Request to /v1/acquisition/appraisal failed.`;

      logger.error(message, { appraisalApiRoute, error: err });
      res.status(500).json({ status: 'error', message: err?.message });
    }
  },
  {
    method: 'POST',
  }
);

async function postAppraisal(payload: AppraisalPayload) {
  return await axios.post(
    `${serverRuntimeConfig.ACQUISITIONS_URL}/acquisition/appraisal`,
    { payload }
  );
}
