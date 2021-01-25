import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

import { expireCookies } from './signout';

import { AccessToken } from 'src/networking/models/Auth';

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
      const status = parseInt(err.errors.extensions?.code, 10) ?? 500;

      let expired = false;
      if (req.cookies.accessToken) {
        const accessToken: AccessToken = jwtDecode(req.cookies.accessToken);
        expired = new Date() > new Date(accessToken.exp * 1000);
      } else {
        expired = true;
      }

      if (status === 401 && expired) {
        res = expireCookies(res);
        res.redirect(status, '/signin');
      } else {
        res.status(status).json(err.errors);
      }
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
