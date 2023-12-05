import { NextApiRequest, NextApiResponse } from 'next';

import {
  decodeGoogleToken,
  fetchAuthToken,
  preSignUp,
} from '../../modules/3pa-login';
import requestHandler from '../../utils/requestHandler';

export default requestHandler(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const decodedToken = await decodeGoogleToken(req.body.token);
    await preSignUp(decodedToken);
    const response = await fetchAuthToken(req.body.token);

    res.status(response.status).json(response.data);
  },
  {
    method: 'POST',
  }
);
