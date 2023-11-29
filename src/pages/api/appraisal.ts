import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import { AppraisalPayload } from '../../interfaces.d';
import fakeOffer from '../../modules/api/fakeOffer';
import { getIsEmailBanned } from '../../modules/api/getIsEmailBanned';
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
      logger.warn(`Google reCAPTCHA token ${token} failed validation.`, {
        appraisalApiRoute,
        request_payload: req.body,
        fpid,
        ajs_anonymous_id,
      });
      res.status(400).json({
        status: 'error',
        message: `Google reCAPTCHA token ${token} failed validation.`,
      });
      return;
    }

    if (!checkBotActivity(req)) {
      logger.warn(`Bot activity detected.`, {
        appraisalApiRoute,
        request_payload: req.body,
        fpid,
        ajs_anonymous_id,
        referrer: req.headers.referer || req.headers.referrer,
        user_agent: req.headers['user-agent'],
        signature: req.headers['x-signature'],
        token: req.headers['x-token'],
      });
      res.status(400).end();
      return;
    }

    if (await getIsEmailBanned(payload.email)) {
      logger.warn(`Email ${payload.email} is banned.`, {
        appraisalApiRoute,
        request_payload: req.body,
        fpid,
        ajs_anonymous_id,
      });
      res.status(200).json({ data: fakeOffer });
      return;
    }

    try {
      const { data } = await postAppraisal(payload);

      logger.info(`Successful response from /v1/acquisition/appraisal`, {
        appraisalApiRoute,
        response: data,
      });
      res.status(200).json(data);
    } catch (err: unknown) {
      const message = `Request to /v1/acquisition/appraisal failed.`;

      logger.error(message, { appraisalApiRoute, error: err });
      res.status(500).json({
        status: 'error',
        message:
          typeof err === 'object' && err !== null && 'message' in err
            ? err?.message
            : '',
      });
    }
  },
  {
    method: 'POST',
  }
);

function postAppraisal(payload: AppraisalPayload) {
  return axios.post(
    `${serverRuntimeConfig.ACQUISITIONS_URL}/acquisition/appraisal`,
    { payload }
  );
}
