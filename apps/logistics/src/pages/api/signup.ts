import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Tokens } from 'src/networking/models/Auth';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const url = process.env.GEARBOX_URL ?? '';

  const data = JSON.stringify({
    query: `mutation signup($username: String!, $password: String!, $source: String!, $firstName: String!, $lastName: String!, $middleName: String, $phone: String!, $emailMarketingConsent: Boolean!, $smsMarketingConsent: Boolean!) {
	signup(username: $username, password: $password, source: $source, firstName: $firstName, lastName: $lastName, middleName: $middleName, phone: $phone, emailMarketingConsent: $emailMarketingConsent, smsMarketingConsent: $smsMarketingConsent) {
    accountId,
    accessToken,
    refreshToken,
    idToken
  }
}`,
    variables: {
      username: req.body.username,
      password: req.body.password,
      source: 'logistics',
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: '',
      phone: '',
      emailMarketingConsent: false,
      smsMarketingConsent: false,
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
      accessToken: response.data.data.signup.accessToken,
      idToken: response.data.data.signup.idToken,
      refreshToken: response.data.data.signup.refreshToken,
    };
    res.json(body);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
