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

const chunksMap = new Map();
const uploadTimeouts = new Map();

const clearUploadData = (uploadId: string) => {
  chunksMap.delete(uploadId);
  uploadTimeouts.delete(uploadId);
};

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { uploadId, chunkIndex, totalChunks, fileType, priceId } = req.query;
    if (
      !uploadId ||
      !chunkIndex ||
      !totalChunks ||
      !fileType ||
      !priceId ||
      typeof uploadId !== 'string' ||
      typeof chunkIndex !== 'string' ||
      typeof totalChunks !== 'string' ||
      typeof fileType !== 'string' ||
      typeof priceId !== 'string'
    ) {
      res.status(400).end();
      return;
    }

    clearTimeout(uploadTimeouts.get(uploadId));
    const timeout = setTimeout(() => clearUploadData(uploadId), 10 * 60 * 1000); // 10 minutes
    uploadTimeouts.set(uploadId, timeout);

    const chunksArray: any[] = [];
    req.on('data', (chunk) => {
      chunksArray.push(chunk);
    });

    req.on('end', async () => {
      const chunkBuffer = Buffer.concat(chunksArray);

      if (!chunksMap.has(uploadId)) {
        chunksMap.set(uploadId, []);
      }

      chunksMap.get(uploadId)[chunkIndex] = chunkBuffer;

      if (chunksMap.get(uploadId).length === parseInt(totalChunks)) {
        const fileBuffer = Buffer.concat(
          chunksMap.get(uploadId).filter(Boolean)
        );

        let imageBuffer;
        try {
          imageBuffer = await sharp(fileBuffer).jpeg().toBuffer();
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

        clearUploadData(uploadId);
      } else {
        res.status(200).end(`Chunk ${chunkIndex} uploaded`);
      }
    });
  },
  {
    method: 'POST',
  }
);
