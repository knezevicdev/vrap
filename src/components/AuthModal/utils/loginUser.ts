import client from '../../../networking/client';

interface SignedInUser {
  externalUserID: string;
}

const loginUser = (username: string, password: string) => {
  return client.httpRequest<SignedInUser>({
    method: 'POST',
    url: `${client.httpEndpoints.interchangeUrl}/myaccount/signin-web`,
    data: {
      source: 'appraisal',
      version: '2',
      timestamp: new Date(),
      payload: {
        username,
        password,
      },
    },
  });
};

export default loginUser;
