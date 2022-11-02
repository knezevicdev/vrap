import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import axios from 'axios';

import { DetailsResponse, NewVinDecodeResp } from '../../interfaces.d';
import logger from '../../utils/logger';

const appraisalApiRoute = '/api/details';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { token, vehicleId } = req.body;

    logger.info(`Request to /appraisal/api/details started`, {
      appraisalApiRoute,
      request_payload: req.body,
    });

    try {
      const { data: captchaResponse } = await verifyReCaptcha(token);

      if (captchaResponse.success) {
        const { data: details } = await getDetails(vehicleId);

        logger.info(`Successful response from /v1/details/${vehicleId}`, {
          appraisalApiRoute,
          vehicleId,
          response: details,
        });

        const response = mapDetailsToResponse(details);

        return res.status(200).json(response);
      } else {
        const message = `Google reCAPTCHA token ${token} failed validation.`;

        logger.error(message, {
          appraisalApiRoute,
          vehicleId,
          captcha_token: token,
        });
        return res.status(400).json({ status: 'error', message });
      }
    } catch (err: any) {
      const message = `Request to /v1/details/${vehicleId} failed.`;

      logger.error(message, { appraisalApiRoute, error: err });
      return res.status(500).json({ status: 'error', message });
    }
  } else {
    return res
      .status(405)
      .json({ status: 'error', message: 'Unsupported method.' });
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
    `${serverRuntimeConfig.NEXT_PUBLIC_ACQUISITIONS_URL}/details/${vehicleId}`
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
