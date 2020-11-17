import { NextApiRequest, NextApiResponse } from 'next';

import { Shipment } from 'src/networking/models/Shipments';

export default (_req: NextApiRequest, res: NextApiResponse): void => {
  const items: Shipment[] = [
    {
      vin: 'WAUHGAFC5DN008610',
      yearMakeModel: '2015 Hyundai Sonata (book)',
      posted: '10/10/2020 3:00PM',
      origin: '738 Beep Beep Blvd, Huntsville, TX',
      destination: '738 Beep Beep Blvd, Huntsville, TX',
      blackoutDates: ['11/10/2020'],
      notes: 'Here is a note preview!',
      pickedUp: true,
    },
    {
      vin: '1HGCR2F36GA220734',
      yearMakeModel: '2015 Hyundai Sonata',
      posted: '10/10/2020 3:00PM',
      origin: '738 Beep Beep Blvd, Huntsville, TX',
      destination: '738 Beep Beep Blvd, Huntsville, TX',
      blackoutDates: ['11/10/2020'],
      notes: 'Here is a note preview!',
      pickedUp: true,
    },
    {
      vin: '1G1RD6S57JU119870',
      yearMakeModel: '2015 Hyundai Sonata',
      posted: '10/10/2020 3:00PM',
      origin: '738 Beep Beep Blvd, Huntsville, TX',
      destination: '738 Beep Beep Blvd, Huntsville, TX',
      blackoutDates: ['11/10/2020'],
      notes: 'Here is a note preview!',
      pickedUp: true,
    },
    {
      vin: '2GNFLHEK1F6424918',
      yearMakeModel: '2015 Hyundai Sonata',
      posted: '10/10/2020 3:00PM',
      origin: '738 Beep Beep Blvd, Huntsville, TX',
      destination: '738 Beep Beep Blvd, Huntsville, TX',
      blackoutDates: ['11/10/2020'],
      notes: 'Here is a note preview!',
      pickedUp: true,
    },
    {
      vin: '1FA6P8TH8F5424856',
      yearMakeModel: '2015 Hyundai Sonata',
      posted: '10/10/2020 3:00PM',
      origin: '738 Beep Beep Blvd, Huntsville, TX',
      destination: '738 Beep Beep Blvd, Huntsville, TX',
      blackoutDates: ['11/10/2020'],
      notes: 'Here is a note preview!',
      pickedUp: true,
    },
  ];
  res.status(200).json(items);
};
