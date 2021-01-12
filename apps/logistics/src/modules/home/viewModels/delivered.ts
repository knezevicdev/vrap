import { addressToStringArray } from '..';
import { Accessor, TableData } from '../Table';

import { Model } from 'src/mvvm';
import { Shipment } from 'src/networking/models/Shipments';

type ViewProps = TableData;

const deliveredData = ({
  response,
}: Model<{ shipments: Shipment[] }, {}, {}>): ViewProps => ({
  headers: [
    { display: 'VIN', accessor: Accessor.vin },
    { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
    {
      display: 'Delivery Date',
      accessor: Accessor.deliveredDate,
      sortBy: true,
    },
    {
      display: 'Estimated Delivery',
      accessor: Accessor.estimatedDeliveryDate,
      sortBy: true,
    },
    { display: 'Origin', accessor: Accessor.originAddress },
    { display: 'Destination', accessor: Accessor.destinationAddress },
    { display: 'Blackout Dates', accessor: Accessor.blackoutDates },
  ],
  rows:
    response?.shipments.map((row: Shipment) => ({
      id: row.vin,
      data: {
        [Accessor.vin]: row.vin,
        [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`,
        [Accessor.deliveredDate]: row.date_posted || '',
        [Accessor.estimatedDeliveryDate]: row.estimated_delivery || '',
        [Accessor.originAddress]: addressToStringArray(row.origin_address),
        [Accessor.destinationAddress]: addressToStringArray(
          row.destination_address
        ),
        [Accessor.blackoutDates]:
          row.blackout_dates?.map((date) => date.start) || '',
      },
    })) || [],
});

export default deliveredData;
