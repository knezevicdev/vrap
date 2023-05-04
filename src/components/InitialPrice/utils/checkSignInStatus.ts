import { isErrorResponse } from '@vroom-web/networking';

import client from 'src/networking/client';

const checkSignInStatus = async () => {
  const signInStatusResp = await client.signInStatus();
  if (isErrorResponse(signInStatusResp)) throw signInStatusResp;
  return (
    signInStatusResp &&
    signInStatusResp.data &&
    signInStatusResp.data.status === 'active'
  );
};

export default checkSignInStatus;
