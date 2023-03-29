import client from '../../../networking/client';

interface CheckAccountResponse {
  exists: boolean;
}

const checkAccount = (username: string) => {
  return client.httpRequest<CheckAccountResponse>({
    method: 'POST',
    url: `/appraisal/api/check-account`,
    data: {
      username,
    },
  });
};

export default checkAccount;
