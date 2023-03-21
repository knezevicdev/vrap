import axios from 'axios';
import FormData from 'form-data';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import sharp from 'sharp';

import logger from '../../../../utils/logger';
import requestHandler from '../../../../utils/requestHandler';

const { serverRuntimeConfig } = getConfig();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { fileType, priceId } = req.query;
    if (
      !fileType ||
      !priceId ||
      typeof fileType !== 'string' ||
      typeof priceId !== 'string'
    ) {
      res.status(400).end();
      return;
    }

    const chunksArray: any[] = [];
    req.on('data', (chunk) => {
      chunksArray.push(chunk);
    });

    req.on('end', async () => {
      const combinedChunks = Buffer.concat(chunksArray);

      let imageBuffer;
      try {
        imageBuffer = await sharp(combinedChunks).jpeg().toBuffer();
      } catch (e) {
        logger.error('Error while transforming photo', { error: e });
        res.status(400).end();
        return;
      }

      const form = new FormData();
      form.append('image', imageBuffer, `${priceId}-${fileType}.jpeg`);

      try {
        const { data } = await axios.post(
          `${serverRuntimeConfig.APPRAISAL_API_URL}/api/v2.0/images/${req.query.vin}?uploaderType=verification`,
          form,
          {
            headers: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              'Content-Type': `multipart/form-data; boundary=${
                (form as any)._boundary
              }`,
              APIKEY: serverRuntimeConfig.APPRAISAL_API_API_KEY,
            },
          }
        );
        res.json(data);
      } catch (e) {
        logger.error('Error while uploading photo', { error: e });
        res.status(403).end();
      }
    });
  },
  {
    method: 'POST',
  }
);
