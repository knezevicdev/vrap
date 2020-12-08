import axios from 'axios';
import cookie from 'cookie';
import jwtDecode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const url = 'https://gearbox-dev-int.vroomapi.com/query';

  const data = JSON.stringify({
    query: `mutation signin($user: String!, $password: String!, $source: String!) {
    signin(username: $user, password: $password, source: $source) {
      accountId,
      accessToken,
      refreshToken,
      idToken
    }
  }`,
    variables: {
      user: 'david.galdamez@vroom.com',
      password: 'SomePassw0rd!',
      source: 'Test',
    },
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(url, data, config);
    const cookies = [
      {
        name: 'accessToken',
        value: response.data.data.signin.accessToken,
      },
      {
        name: 'refreshToken',
        value: response.data.data.signin.refreshToken,
      },
    ].map((i) =>
      cookie.serialize(i.name, i.value, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
    );
    res.setHeader('Set-Cookie', cookies);
    res.json(jwtDecode(response.data.data.signin.accessToken));
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
