import cookie from 'cookie';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

export const expireCookies = (res: NextApiResponse): NextApiResponse => {
  const expires = dayjs(1).toDate();
  const secure = process.env.NODE_ENV !== 'development';
  const sameSite = true;
  const setCookies = ['accessToken', 'idToken', 'refreshToken'].map(
    (name): string => {
      return cookie.serialize(name, '', { expires, sameSite, secure });
    }
  );
  setCookies.push(
    cookie.serialize('authData', '', {
      expires,
      path: '/',
      sameSite,
      secure,
    })
  );
  res.setHeader('Set-Cookie', setCookies);
  return res;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    res = expireCookies(res);
    res.json({});
  } catch (err) {
    res.status(500).json(err);
  }
}
