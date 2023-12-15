import { OAuth2Client } from 'google-auth-library';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const decodeGoogleToken = async (token: string) => {
  const client = new OAuth2Client();
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: serverRuntimeConfig.GOOGLE_3PA_CLIENT_ID,
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
