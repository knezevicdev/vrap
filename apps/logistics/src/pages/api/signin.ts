import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Tokens } from 'src/networking/models/Auth';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const email = req.body.email;
  const password = req.body.password;

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
      user: email,
      password,
      source: 'Logistics',
    },
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(url, data, config);
    const body: Tokens = {
      accessToken: response.data.data.signin.accessToken,
      idToken: response.data.data.signin.idToken,
      refreshToken: response.data.data.signin.refreshToken,
    };
    res.json(body);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
