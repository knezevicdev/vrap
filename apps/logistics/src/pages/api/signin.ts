import axios from 'axios';
import cookie from 'cookie';
import jwtDecode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

import { IdToken } from 'src/networking/models/Auth';

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
    const body: IdToken = jwtDecode(response.data.data.signin.idToken);
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
        return cookie.serialize(name, response.data.data.signin[name], config);
      }
    );
    res.setHeader('Set-Cookie', setCookies);
    res.json(body);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
