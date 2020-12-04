import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const username = process.env.SHIPPING_PORTAL_USERNAME || '';
  const password = process.env.SHIPPING_PORTAL_PASSWORD || '';

  const user = null;
  const status = req.query.status as string;

  const url = `${
    process.env.SHIPPING_PORTAL_URL
  }/shipping/shipments?${qs.stringify(
    {
      user,
      status,
    },
    { skipNulls: true }
  )}`;

  try {
    const response = await axios.get(url, {
      auth: { username, password },
    });
    res.status(200).json(response.data.data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
