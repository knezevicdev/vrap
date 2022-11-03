import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import axios from 'axios';

import { DetailsResponse, NewVinDecodeResp } from '../../interfaces.d';
import getFingerprintBotInfo from '../../utils/getFingerprintBotInfo';
import logger from '../../utils/logger';
import { verifyReCaptcha } from '../../utils/verifyReCaptcha';

const appraisalApiRoute = '/api/details';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(405).json({ status: 'error', message: 'Unsupported method.' });
  }

  const { token, vehicleId } = req.body;
  const { requestId = 'unknown', visitorId = 'unknown' } = req.query;
  const { fpid, ajs_anonymous_id } = req.cookies; // eslint-disable-line @typescript-eslint/naming-convention

  const [isRecaptchaValid, fingerprintBotResult] = await Promise.all([
    verifyReCaptcha(token, appraisalApiRoute),
    getFingerprintBotInfo(requestId as string),
  ]);

  logger.info(`Request to /appraisal/api/details started`, {
    appraisalApiRoute,
    request_payload: req.body,
    isRecaptchaValid,
    fingerprintBotResult,
    fingerprintMeta: {
      requestId,
      visitorId,
    },
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

  try {
    const { data: details } = await getDetails(vehicleId);

    logger.info(`Successful response from /v1/details/${vehicleId}`, {
      appraisalApiRoute,
      vehicleId,
      response: details,
    });

    const response = mapDetailsToResponse(details);

    res.status(200).json(response);
  } catch (err: any) {
    const message = `Request to /v1/details/${vehicleId} failed.`;

    logger.error(message, { appraisalApiRoute, error: err });
    res.status(500).json({ status: 'error', message });
  }
};

async function getDetails(vehicleId: string) {
  return await axios.get(
    `${serverRuntimeConfig.VIS_URL}v1/carstory/details/${vehicleId}?cacheCarfax=true&cacheAutocheck=true`
  );
}

function mapDetailsToResponse(details: NewVinDecodeResp): DetailsResponse {
  const { dataProviderInfo, vehicleInfo } = details;
  const response: DetailsResponse = {
    vehicleInfo: {
      exteriorColor: vehicleInfo?.exteriorColor,
      make: vehicleInfo?.make,
      model: vehicleInfo?.model,
      subTrim: vehicleInfo?.subTrim,
      trim: vehicleInfo?.trim,
      vin: vehicleInfo?.vin,
      year: vehicleInfo?.year,
    },
    dataProviderInfo: {},
  };

  if (dataProviderInfo && Object.keys(dataProviderInfo).length) {
    response.dataProviderInfo = {
      carstory: {
        alternatives: dataProviderInfo?.carstory?.alternatives || [],
        features: dataProviderInfo?.carstory?.features || [],
        id: dataProviderInfo?.carstory?.id || '',
        style: dataProviderInfo?.carstory?.style || '',
      },
    };
  }

  return response;
}
