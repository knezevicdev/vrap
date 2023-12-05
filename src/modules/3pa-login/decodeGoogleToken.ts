import { OAuth2Client } from 'google-auth-library';

const decodeGoogleToken = async (token: string) => {
  const client = new OAuth2Client();
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        '896223242054-5gh2hun3seb386kg5lu1ke6l8uko8bg9.apps.googleusercontent.com',
    });
    return ticket.getPayload();
  }

  const decodedToken = await verify();
  if (!decodedToken) {
    throw new Error('Invalid token');
  }

  return decodedToken;
};

export default decodeGoogleToken;
