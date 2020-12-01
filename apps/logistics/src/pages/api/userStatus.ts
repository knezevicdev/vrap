/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const url = `${process.env.SHIPPING_PORTAL_URL}/shipping/userstatus`;

  const response = await axios.get(url, {
    auth: { username: 'user', password: 'password' },
  });
  res.status(200).json(response.data.data);
}
