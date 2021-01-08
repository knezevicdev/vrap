import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const url = process.env.GEARBOX_URL ?? '';

  try {
    const portalUserCreate = {
      gql: {
        query: `mutation createUser($username: String!, $firstName: String!, $lastName: String!) {
          portalUserCreate(username: $username, firstName: $firstName, lastName: $lastName) {
            __typename
            ... on PortalUser {
                portal_user_id
                username
                status
                first_name
                middle_name
                last_name
                phone
                created_on
                updated_on
                carrier {
                  carrier_id
                  carrier
                  carrier_code
                }
                portal_roles {
                  portal_role_id
                  name
                }
              }
                ... on APIError {
              errorType
              errorTitle
              errorDetail
            }
          }
        }`,
        variables: {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      },
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    };

    await axios.post(
      url,
      JSON.stringify(portalUserCreate.gql),
      portalUserCreate.config
    );

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

    res.json({});
  } catch (err) {
    console.error('error', err);

    // TODO: Abstract this
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
