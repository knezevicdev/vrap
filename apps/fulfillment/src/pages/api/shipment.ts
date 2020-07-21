import { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json([
    {
      vin: 'WAUHGAFC5DN008610',
      year: 2017,
      make: 'Ford',
      model: 'Taurus',
      readyToShip: new Date('2019-10-04T10:30:00'),
      typeOfOrder: 'Resell',
      currentLocation: 'Manheim',
      journeyType: 'Leg-to-hub',
    },
  ]);
};
