import axios from 'axios';
import { get } from 'lodash';

const fingerprintPublicKey = process.env.NEXT_PUBLIC_FINGERPRINT_PUBLIC_KEY;
const fingerprintSecretKey = process.env.FINGERPRINT_SECRET_KEY;

const getFingerprintBotInfo = async (requestId: string): Promise<string> => {
  try {
    const { data } = await axios.get(
      `https://api.fpjs.io/events/${requestId}?api_key=${fingerprintPublicKey}`,
      {
        timeout: 1000,
        headers: {
          'Auth-API-Key': fingerprintSecretKey, // eslint-disable-line @typescript-eslint/naming-convention
        },
      }
    );

    return get(data, 'products.botd.data.bot.result') || 'unknown';
  } catch (e) {
    return 'unknown';
  }
};

export default getFingerprintBotInfo;
