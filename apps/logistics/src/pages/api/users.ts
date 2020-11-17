/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const carrier = req.query.carrier as string;
  const status = req.query.status as string;

  const SHIPPING_PORTAL_URL = 'https://shipping-portal-int.vroomapi.com/v2';
  const url = `${SHIPPING_PORTAL_URL}/shipping/users?${qs.stringify({
    carrier,
    status,
  })}`;

  const response = await axios.get(url, {
    auth: { username: 'user', password: 'password' },
  });
  res.status(200).json(response.data.data);
}
