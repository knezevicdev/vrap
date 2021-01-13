import { addressToStringArray } from '..';
import { Accessor, TableData } from '../Table';

import { Model } from 'src/mvvm';
import { Shipment } from 'src/networking/models/Shipments';

type ViewProps = TableData;

const bookedData = ({
  response,
}: Model<{ shipments: Shipment[] }, {}, {}>): ViewProps => ({
  headers: [
    { display: 'VIN', accessor: Accessor.vin },
    { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
    { display: 'Booked Date', accessor: Accessor.bookedDate, sortBy: true },
    { display: 'Origin', accessor: Accessor.originAddress },
    { display: 'Destination', accessor: Accessor.destinationAddress },
    { display: 'Blackout Dates', accessor: Accessor.blackoutDates },
    { display: 'Estimated Pickup', accessor: Accessor.estimatedPickupDate },
    { display: 'Action(s)', accessor: Accessor.actions },
  ],
  rows:
    response?.shipments.map((row: Shipment) => ({
      id: row.vin,
      data: {
        [Accessor.vin]: row.vin,
        [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`,
        [Accessor.bookedDate]: row.date_posted || '',
        [Accessor.originAddress]: addressToStringArray(row.origin_address),
        [Accessor.destinationAddress]: addressToStringArray(
          row.destination_address
        ),
        [Accessor.blackoutDates]:
          row.blackout_dates?.map((date) => date.start) || '',
        [Accessor.estimatedPickupDate]: row.estimated_pickup || '',
        [Accessor.actions]: [
          { text: 'Picked Up', handler: (): void => undefined, primary: true },
          { text: 'Cancel', handler: (): void => undefined },
        ],
      },
    })) || [],
});

export default bookedData;
