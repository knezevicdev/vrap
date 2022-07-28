import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import axios from 'axios';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { token, vehicleId } = req.body;

    try {
      const { data: captchaResponse } = await verifyReCaptcha(token);

      if (captchaResponse.success) {
        const { data: details } = await getDetails(vehicleId);
        res.status(200).json(details);
      } else {
        res.status(400).json({
          status: 'error',
          message: `Google reCAPTCHA token failed validation.`,
        });
      }
    } catch (err) {
      res.status(500);
    }
  } else {
    res.status(405);
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

async function getDetails(vehicleId: string) {
  return await axios.get(
    `${serverRuntimeConfig.NEXT_PUBLIC_VROOM_URL}/suyc-api/v1/details/${vehicleId}`
  );
}
