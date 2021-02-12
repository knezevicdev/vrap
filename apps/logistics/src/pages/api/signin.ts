import axios from 'axios';
import cookie from 'cookie';
import jwtDecode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

import { Groups, IdToken } from 'src/networking/models/Auth';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const email = req.body.email;
  const password = req.body.password;

  const url = process.env.GEARBOX_URL ?? '';

  const gql = JSON.stringify({
    query: `mutation signin($user: String!, $password: String!, $source: String!) {
    signin(username: $user, password: $password, source: $source) {
      accountId,
      accessToken,
      refreshToken,
      idToken
    }
  }`,
    variables: {
      user: email,
      password,
      source: 'logistics',
    },
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(url, gql, config);
    if (response.data.errors) {
      throw { type: 'service', errors: response.data.errors };
    }
    const body: IdToken = jwtDecode(response.data.data.signin.idToken);
    if (
      body['cognito:groups'] &&
      body['cognito:groups'].includes(Groups.LogisticsPortal)
    ) {
      const expires = new Date(body.exp * 1000);
      const setCookies = ['accessToken', 'idToken', 'refreshToken'].map(
        (name): string => {
          const config: cookie.CookieSerializeOptions = {
            expires,
            sameSite: true,
          };
          if (process.env.NODE_ENV !== 'development') {
            config.secure = true;
          }
          return cookie.serialize(
            name,
            response.data.data.signin[name],
            config
          );
        }
      );
      res.setHeader('Set-Cookie', setCookies);
      res.json(body);
    } else {
      res.status(403).json({});
    }
  } catch (err) {
    if (err.type === 'service') {
      const message: string = err.errors[0].message;
      const status = parseInt(
        message.substring(message.search(/\d/g), message.search(/\d/g) + 3),
        10
      );
      const body = JSON.parse(message.substring(message.indexOf('{')));
      res.status(status).json(body);
    } else {
      res.status(500).json(err);
    }
  }
};
