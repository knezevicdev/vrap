import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import { AppraisalPayload } from '../../interfaces.d';
import checkBotActivity from '../../utils/checkBotActivity';
import logger from '../../utils/logger';
import requestHandler from '../../utils/requestHandler';
import { verifyReCaptcha } from '../../utils/verifyReCaptcha';

const { serverRuntimeConfig } = getConfig();

const appraisalApiRoute = '/api/appraisal';

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { payload, token } = req.body;
    const { fpid, ajs_anonymous_id } = req.cookies; // eslint-disable-line @typescript-eslint/naming-convention

    const isRecaptchaValid = await verifyReCaptcha(token, appraisalApiRoute);

    logger.info(`Request to /appraisal/api/appraisal started`, {
      appraisalApiRoute,
      request_payload: req.body,
      isRecaptchaValid,
      fpid,
      ajs_anonymous_id,
    });

    if (!isRecaptchaValid) {
      res.status(400).json({
        status: 'error',
        message: `Google reCAPTCHA token ${token} failed validation.`,
      });
      return;
    }

    if (!checkBotActivity(req)) {
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
    `${serverRuntimeConfig.NEXT_PUBLIC_ACQUISITIONS_URL}/acquisition/appraisal`,
    { payload }
  );
}
