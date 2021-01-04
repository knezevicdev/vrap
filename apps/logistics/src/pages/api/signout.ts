import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const setCookies = ['accessToken', 'idToken', 'refreshToken'].map(
      (name): string => {
        const expires = new Date(0).toUTCString();
        return `${name}=''; Expires=${expires}`;
      }
    );
    res.setHeader('Set-Cookie', setCookies);
    res.json({});
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
