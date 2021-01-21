import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const API_ERROR = 'APIError';

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

    if (response.data.errors) {
      throw {
        type: 'gearbox',
        errors: response.data.errors[0],
      };
    }

    if (response.data.data[queryKey]?.['__typename'] === API_ERROR) {
      throw { type: API_ERROR, data: response.data.data[queryKey] };
    }

    res.json(response.data.data[queryKey]);
  } catch (err) {
    if (err.type === API_ERROR) {
      res.status(500).json(err.data);
    } else if (err.type === 'gearbox') {
      res
        .status(parseInt(err.errors.extensions?.code, 10) ?? 500)
        .json(err.errors);
    } else {
      res.status(err?.response?.status ?? 500);
      if (err.response?.statusText && err.response?.data) {
        res.json({
          statusText: err.response.statusText,
          data: err.response.data,
        });
      } else {
        res.json(err);
      }
    }
  }
}
