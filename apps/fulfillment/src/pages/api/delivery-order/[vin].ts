/* eslint-disable @typescript-eslint/camelcase */
import { NextApiRequest, NextApiResponse } from 'next';

import { Details } from 'src/networking/models/DeliveryOrder';

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  const item: Details = {
    id: 16583,
    vehicle: {
      id: 3,
      vin: '3KPA24AB4KE172497',
      year: 2019,
      make: 'Kia',
      model: 'Rio',
    },
    transitType: 'Pickup From Auction',
    enclosed: false,
    orderStatus: 'Ready for Pickup',
    pickupAddress: {
      id: 1,
      name: 'Acme Auto Wholesalers',
      street_line_1: '1375 Broadway',
      city: 'New York',
      state: 'NY',
      postal_code: '10018',
    },
    deliveryAddress: {
      id: 4,
      name: 'Vroom - Statesville Recon',
      street_line_1: '145 Auction Ln',
      city: 'Statesville',
      state: 'NC',
      postal_code: '28625',
    },
    recommendedDeliveryLocation: 'Vroom - Statesville Recon',
    updated: new Date('2020-07-24T14:45:00').toISOString(),
    updatedBy: 'Andres De Jesus',
  };
  res.status(200).json(item);
};
