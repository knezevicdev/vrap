/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
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
      auth: { username: 'user', password: 'password' },
    });
    res.status(200).json(response.data.data);
  } else if (req.method === 'PATCH') {
    const id = req.body.id;
    const status = req.body.status;
    const url = `${process.env.SHIPPING_PORTAL_URL}/shipping/users/${id}`;
    try {
      const body = {
        source: 'logistics portal',
        timestamp: new Date().toISOString(),
        version: '1.0',
        payload: { status },
      };
      const response = await axios.patch(url, body, {
        auth: { username: 'user', password: 'password' },
      });
      res.status(200).json(response.data.data);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}
