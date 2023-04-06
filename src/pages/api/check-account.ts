import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import requestHandler from '../../utils/requestHandler';
import { verifyReCaptcha } from '../../utils/verifyReCaptcha';

const { serverRuntimeConfig } = getConfig();
export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const token = req.body.token;
    const isRecaptchaValid = await verifyReCaptcha(token, '/api/check-account');
    if (!isRecaptchaValid) {
      res.status(400).json({
        status: 'error',
        message: `Google reCAPTCHA token ${token} failed validation.`,
      });
      return;
    }

    const username = req.body.username;

    try {
      await axios.get(
        `${serverRuntimeConfig.ACCOUNT_MANAGEMENT_URL}/v2/accounts/${username}`
      );
      res.json({ exists: true });
    } catch (e) {
      res.json({ exists: false });
    }
  },
  {
    method: 'POST',
  }
);
