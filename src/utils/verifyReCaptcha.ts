import axios from 'axios';
import getConfig from 'next/config';

import logger from './logger';

const { serverRuntimeConfig } = getConfig();

export async function verifyReCaptcha(
  token: string,
  apiRoute: string
): Promise<boolean> {
  let isSuccessfullyVerified = false;
  let error = null;

  try {
    const { data: captchaResponse } = await axios.post(
      serverRuntimeConfig.RECAPTCHA_VERIFICATION_URL,
      null,
      {
        params: {
          secret: serverRuntimeConfig.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    isSuccessfullyVerified = captchaResponse.success;
  } catch (err) {
    error = err;
  }

  if (!isSuccessfullyVerified) {
    const message = `Google reCAPTCHA token ${token} failed validation.`;

    logger.error(message, { apiRoute, captcha_token: token, error });
  }

  return isSuccessfullyVerified;
}
