import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NextApiRequest, NextApiResponse } from 'next';

import { AccessToken, Groups } from 'src/networking/models/Auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const url = process.env.GEARBOX_URL ?? '';

  try {
    const signup = {
      gql: {
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
      },
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    };

    const signUpResponse = await axios.post(
      url,
      JSON.stringify(signup.gql),
      signup.config
    );

    if (signUpResponse.data.errors) {
      throw { type: 'gearbox', errors: signUpResponse.data.errors };
    }
    const accessToken: string = signUpResponse.data.data.signup.accessToken;

    const decodedAccessToken: AccessToken = jwtDecode(accessToken);

    const addGroupToUser = {
      gql: {
        query: `mutation addGroupToUser($username: String!, $group: String!) {
        addGroupToUser(username: $username, group: $group) {
          __typename
          ... on StringArray {
            values
          }
          ... on APIError {
            errorType
            errorTitle
            errorDetail
          }
        }
      }`,
        variables: {
          username: decodedAccessToken.username,
          group: Groups.LogisticsPortalPending,
        },
      },
      config: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    };

    await axios.post(
      url,
      JSON.stringify(addGroupToUser.gql),
      addGroupToUser.config
    );
    res.json({});
  } catch (err) {
    // TODO: Abstract this
    // This is a check because gearbox will return a 200 if it works but if a
    // downstream message has an issue we then have to inspect the return
    // object for a errors key, hence the thrown object above
    if (err.type === 'gearbox') {
      const message: string = err.errors[0].message;
      const status = parseInt(
        message.substring(message.search(/\d/g), message.search(/\d/g) + 3),
        10
      );
      const body = JSON.parse(message.substring(message.indexOf('{')));
      res.status(status).json(body);
    } else {
      res.status(err?.response?.status ?? 500);
      if (err?.response?.statusText && err?.response?.data) {
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
