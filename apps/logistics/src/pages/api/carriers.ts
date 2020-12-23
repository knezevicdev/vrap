/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const filter = req.query.filter as string;

  const url = `${
    process.env.SHIPPING_PORTAL_URL
  }/shipping/carriers?${qs.stringify({
    filter,
  })}`;

  const username = process.env.SHIPPING_PORTAL_USERNAME || '';
  const password = process.env.SHIPPING_PORTAL_PASSWORD || '';

  const response = await axios.get(url, {
    auth: { username, password },
  });
  res.status(200).json(response.data.data);
}