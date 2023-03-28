import client from '../../../networking/client';

interface SignedInUser {
  externalUserID: string;
}

const registerUser = (
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string
) => {
  return client.httpRequest<SignedInUser>({
    method: 'POST',
    url: `${client.httpEndpoints.interchangeUrl}/myaccount/signup-web`,
    data: {
      source: 'appraisal',
      version: '2',
      timestamp: new Date(),
      payload: {
        username,
        password,
        firstName,
        lastName,
        phone,
        eventOrigin: 'suyc',
        sendWelcomeEmail: true,
        emailMarketingConsent: false,
      },
    },
  });
};

export default registerUser;
