import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const url = process.env.GEARBOX_URL ?? '';

  const gql = {
    query: req.body.query,
    variables: req.body.variables,
  };

  const queryKey = req.body.queryKey;

  const config = {
    headers: {
      Authorization: `Bearer ${req.cookies.accessToken}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post(url, gql, config);
    res.json(response.data.data[queryKey]);
  } catch (err) {
    res.status(err?.response?.status ?? 500);
    if (err.response.statusText && err.response.data) {
      res.json({
        statusText: err.response.statusText,
        data: err.response.data,
      });
    } else {
      res.json(err);
    }
  }
}
