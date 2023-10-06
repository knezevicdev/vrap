import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import axios from 'axios';

import { DetailsResponse, NewVinDecodeResp } from '../../../interfaces.d';
import logger from '../../../utils/logger';
import requestHandler from '../../../utils/requestHandler';

const appraisalApiRoute = '/api/mobile/details';

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { vehicleId } = req.body;

    logger.info(`Request to /appraisal/api/details started`, {
      appraisalApiRoute,
      request_payload: req.body,
    });

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
  },
  {
    method: 'POST',
  }
);

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
      fuel: vehicleInfo?.fuel,
      bodyStyle: vehicleInfo?.bodyStyle,
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
