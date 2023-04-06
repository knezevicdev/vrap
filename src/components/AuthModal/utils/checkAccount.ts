import client from '../../../networking/client';

interface CheckAccountResponse {
  exists: boolean;
}

const checkAccount = (username: string, token: string | null) => {
  return client.httpRequest<CheckAccountResponse>({
    method: 'POST',
    url: `/appraisal/api/check-account`,
    data: {
      username,
      token,
    },
  });
};

export default checkAccount;
