import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import axios from 'axios';

import { AppraisalPayload } from '../../interfaces.d';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { payload, token } = req.body;

    try {
      const { data: captchaResponse } = await verifyReCaptcha(token);

      if (captchaResponse.success) {
        const { data } = await postAppraisal(payload);

        res.status(200).json(data);
      } else {
        res.status(400).json({
          status: 'error',
          message: `Google reCAPTCHA token failed validation.`,
        });
      }
    } catch (err: any) {
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
