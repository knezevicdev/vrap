import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

import { expireCookies } from './signout';

import { AccessToken } from 'src/networking/models/Auth';

const API_ERROR = 'APIError';
interface GearboxError {
  message: string;
  path: string[];
  extensions: {
    code: string;
  };
}

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
      if (
        response.data.errors.extensions?.error_code &&
        parseInt(response.data.errors.extensions.error_code, 10) === 401
      ) {
        throw {
          type: 'unauthorized',
          errors: response.data.errors[0],
        };
      } else {
        throw {
          type: 'gearbox',
          errors: response.data.errors[0],
        };
      }
    }

    if (response.data.data[queryKey]?.['__typename'] === API_ERROR) {
      throw { type: API_ERROR, data: response.data.data[queryKey] };
    }

    res.json(response.data.data[queryKey]);
  } catch (err) {
    if (err.type === API_ERROR) {
      res.status(500).json(err.data);
    } else if (err.type === 'unauthorized') {
      let expired = false;
      if (req.cookies.accessToken) {
        const accessToken: AccessToken = jwtDecode(req.cookies.accessToken);
        expired = new Date() > new Date(accessToken.exp * 1000);
      } else {
        expired = true;
      }

      if (expired) {
        res = expireCookies(res);
        res.redirect(401, '/signin');
      } else {
        res.status(401).json(err.errors);
      }
    } else if (err.type === 'gearbox') {
      const gearboxErr: { type: string; errors: GearboxError } = err;
      const status = gearboxErr.errors.extensions?.code
        ? parseInt(gearboxErr.errors.extensions.code, 10)
        : 500;

      res.status(status).json(gearboxErr.errors);
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
