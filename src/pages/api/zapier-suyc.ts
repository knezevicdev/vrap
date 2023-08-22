import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import requestHandler from '../../utils/requestHandler';

const { serverRuntimeConfig } = getConfig();
export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      await axios.post(serverRuntimeConfig.ZAPIER_WEBHOOK, req.body);
      res.json({ ok: true });
    } catch (e) {
      res.json({ ok: false });
    }
  },
  {
    method: 'POST',
  }
);
