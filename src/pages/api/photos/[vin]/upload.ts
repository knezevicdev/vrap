import axios from 'axios';
import FormData from 'form-data';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import sharp from 'sharp';
import { Readable } from 'stream';

import logger from '../../../../utils/logger';
import requestHandler from '../../../../utils/requestHandler';

const { serverRuntimeConfig } = getConfig();

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
});

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    await new Promise((resolve) => {
      upload.single('image')(req as any, res as any, async function (err) {
        if (err) {
          logger.error('Error while multer processing', { error: err });
          return res.status(403).end();
        }

        const file = (req as any).file as MulterFile;
        if (!file) {
          return res.status(403).end();
        }

        const imageBuffer = await sharp(file.buffer).jpeg().toBuffer();

        const form = new FormData();
        form.append(
          'image',
          imageBuffer,
          file.originalname.replace(/\.[^/.]+$/, '') + '.jpeg'
        );

        axios
          .post(
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
          )
          .then((dataRes) => {
            res.json(dataRes.data);
            resolve(null);
          })
          .catch((e) => {
            logger.error('Error while uploading photo', { error: e });
            res.status(403).end();
            resolve(null);
          });
      });
    });
  },
  {
    method: 'POST',
  }
);
