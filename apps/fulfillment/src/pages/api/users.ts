import { NextApiRequest, NextApiResponse } from 'next';

import { Status, User } from 'src/networking/models/User';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): void {
  const result: User[] = [
    {
      accountId: 1219,
      firstName: 'Kevin',
      lastName: 'Parrott',
      emails: {
        personal: {
          email: 'kevin.parrott@vroom.com',
        },
      },
      company: 'Vroom',
      status: Status.Pending,
    },
    {
      accountId: 1234,
      firstName: 'Sasha',
      lastName: 'Kondrashov',
      emails: {
        personal: {
          email: 'sasha.kondrashow@vroom.com',
        },
      },
      company: 'Vroom',
      status: Status.Rejected,
    },
    {
      accountId: 1,
      firstName: 'David',
      lastName: 'Galdamez',
      emails: {
        personal: {
          email: 'david.galdamez@vroom.com',
        },
      },
      company: 'Vroom',
      status: Status.Approved,
    },
  ];

  res.status(200).json(result);
}
