import axios from 'axios';
import FormData from 'form-data';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import sharp from 'sharp';
import { Readable } from 'stream';

const { serverRuntimeConfig } = getConfig();

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.memoryStorage(),
});

type NextApiRequestWithFile = NextApiRequest & {
  file: {
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
  };
};

export default async (
  req: NextApiRequestWithFile,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({
      data: null,
      error: 'Method Not Allowed',
    });
    return;
  }

  await new Promise((resolve) => {
    upload.single('image')(req as any, res as any, async function (err) {
      if (err) {
        return res.status(403).end();
      }

      const imageBuffer = await sharp(req.file.buffer).jpeg().toBuffer();

      const form = new FormData();
      form.append(
        'image',
        imageBuffer,
        req.file.originalname.replace(/\.[^/.]+$/, '') + '.jpeg'
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
        .catch(() => {
          res.status(403).end();
          resolve(null);
        });
    });
  });
};
