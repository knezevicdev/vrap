/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const username = process.env.SHIPPING_PORTAL_USERNAME || '';
  const password = process.env.SHIPPING_PORTAL_PASSWORD || '';

  const url = `${process.env.SHIPPING_PORTAL_URL}/shipping/userstatus`;

  const response = await axios.get(url, {
    auth: { username, password },
  });
  res.status(200).json(response.data.data);
}
