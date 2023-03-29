import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import requestHandler from '../../utils/requestHandler';

const { serverRuntimeConfig } = getConfig();
export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const username = req.body.username;

    try {
      await axios.get(
        `${serverRuntimeConfig.ACCOUNT_MANAGEMENT_URL}/v2/accounts/${username}`
      );
      res.json({ exists: true });
    } catch (e) {
      res.json({ exists: false });
    }
  },
  {
    method: 'POST',
  }
);
