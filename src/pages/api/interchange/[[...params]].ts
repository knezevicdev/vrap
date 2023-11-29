import axios from 'axios';
import * as https from 'https';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const proxy = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (!req.url) {
    res.status(403).end();
    return;
  }

  const url = req.url.replace(
    '/appraisal/api/interchange',
    serverRuntimeConfig.INTERCHANGE_PROXY_TARGET
  );

  const {
    status,
    headers,
    data: bodyStream,
  } = await axios({
    url,
    method: req.method,
    data: req.body,
    responseType: 'stream',
    maxRedirects: 0,
    validateStatus: (status: number) => status >= 200 && status < 500,
    httpsAgent,
    headers: {
      cookie: req.headers.cookie,
    },
  });
  res.status(status);

  const modifiedHeaders = { ...headers };
  if (modifiedHeaders['set-cookie']) {
    modifiedHeaders['set-cookie'] = modifiedHeaders['set-cookie'].map(
      (cookie: string) =>
        cookie
          .replace(/; secure/gi, '')
          .replace('SameSite=Strict', 'SameSite=Lax')
    );
  }

  for (const header in modifiedHeaders) {
    const headerValue = modifiedHeaders[header];
    if (headerValue) {
      res.setHeader(header, headerValue);
    }
  }

  bodyStream.pipe(res);
};

export default proxy;
