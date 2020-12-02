import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const username = process.env.SHIPPING_PORTAL_USERNAME || '';
  const password = process.env.SHIPPING_PORTAL_PASSWORD || '';

  if (req.method === 'GET') {
    const carrier = req.query.carrier as string;
    const status = req.query.status as string;

    const url = `${
      process.env.SHIPPING_PORTAL_URL
    }/shipping/users?${qs.stringify({
      carrier,
      status,
    })}`;

    const response = await axios.get(url, {
      auth: { username, password },
    });
    res.status(200).json(response.data.data);
  } else if (req.method === 'PATCH') {
    const id = req.body.id;
    const status = req.body.status;
    const carrierCode = req.body.carrierCode;

    const payload: { status?: string; carrier_code?: string } = {};
    if (status) {
      payload.status = status;
    }
    if (carrierCode) {
      /* eslint-disable-next-line @typescript-eslint/camelcase */
      payload.carrier_code = carrierCode;
    }

    const url = `${process.env.SHIPPING_PORTAL_URL}/shipping/users/${id}`;
    try {
      const body = {
        source: 'logistics portal',
        timestamp: new Date().toISOString(),
        version: '1.0',
        payload,
      };
      const response = await axios.patch(url, body, {
        auth: { username, password },
      });
      res.status(200).json(response.data.data);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}
