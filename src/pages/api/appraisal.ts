import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import axios from 'axios';

import { AppraisalPayload } from '../../interfaces.d';
import logger from '../../utils/logger';

const appraisalApiRoute = '/api/appraisal';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { payload, token } = req.body;

    logger.info(`Request to /appraisal/api/appraisal started`, {
      appraisalApiRoute,
      request_payload: req.body,
    });

    try {
      const { data: captchaResponse } = await verifyReCaptcha(token);

      if (captchaResponse.success) {
        const { data } = await postAppraisal(payload);

        logger.info(
          `Successful response from /suyc-api/v1/acquisition/appraisal`,
          { appraisalApiRoute, response: data }
        );
        res.status(200).json(data);
      } else {
        const message = `Google reCAPTCHA token ${token} failed validation.`;

        logger.error(message, { appraisalApiRoute, captcha_token: token });
        res.status(400).json({ status: 'error', message });
      }
    } catch (err: any) {
      const message = `Request to /suyc-api/v1/acquisition/appraisal failed.`;

      logger.error(message, { appraisalApiRoute, error: err });
      res.status(500).json({ status: 'error', message: err?.message });
    }
  } else {
    res.status(405).json({ status: 'error', message: 'Unsupported method.' });
  }
};

async function verifyReCaptcha(token: string) {
  return await axios.post(
    serverRuntimeConfig.RECAPTCHA_VERIFICATION_URL,
    null,
    {
      params: {
        secret: serverRuntimeConfig.RECAPTCHA_SECRET_KEY,
        response: token,
      },
    }
  );
}

async function postAppraisal(payload: AppraisalPayload) {
  return await axios.post(
    `${serverRuntimeConfig.NEXT_PUBLIC_VROOM_URL}/suyc-api/v1/acquisition/appraisal`,
    { payload }
  );
}
