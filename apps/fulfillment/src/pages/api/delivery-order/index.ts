import { NextApiRequest, NextApiResponse } from 'next';

import { Summary } from 'src/networking/models/DeliveryOrder';

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  const items: Summary[] = [
    {
      id: 1,
      vehicle: {
        id: 2,
        vin: 'WAUHGAFC5DN008610',
        year: 2017,
        make: 'Ford',
        model: 'Taurus',
      },
      readyToShip: new Date('2019-10-04T10:30:00').toISOString(),
      typeOfOrder: 'Resell',
      currentLocation: 'Manheim',
      journeyType: 'Leg-to-hub',
    },
    {
      id: 2,
      vehicle: {
        id: 3,
        vin: 'WA1LFAFP4FA045722',
        year: 2016,
        make: 'Chevrolet',
        model: 'Cruze',
      },
      readyToShip: new Date('2019-10-07T11:30:00').toISOString(),
      typeOfOrder: 'Resell',
      currentLocation: 'Manheim',
      journeyType: 'Leg-to-hub',
    },
  ];
  res.status(200).json(items);
};
