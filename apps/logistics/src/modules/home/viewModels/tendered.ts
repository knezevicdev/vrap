import { addressToStringArray } from '..';
import { Accessor, TableData } from '../Table';

import { Model } from 'src/mvvm';
import { Shipment } from 'src/networking/models/Shipments';

type ViewProps = TableData;

const tenderedData = ({
  response,
}: Model<{ shipments: Shipment[] }, {}, {}>): ViewProps => ({
  headers: [
    { display: 'VIN', accessor: Accessor.vin },
    { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
    { display: 'Posted Date', accessor: Accessor.postedDate, sortBy: true },
    { display: 'Origin', accessor: Accessor.originAddress },
    { display: 'Destination', accessor: Accessor.destinationAddress },
    { display: 'Action(s)', accessor: Accessor.actions },
  ],
  rows:
    response?.shipments.map((row: Shipment) => ({
      id: row.vin,
      data: {
        [Accessor.vin]: row.vin,
        [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`,
        [Accessor.postedDate]: row.date_posted || '',
        [Accessor.originAddress]: addressToStringArray(row.origin_address),
        [Accessor.destinationAddress]: addressToStringArray(
          row.destination_address
        ),
        [Accessor.actions]: {
          text: 'Book',
          handler: (): void => undefined,
          primary: true,
        },
      },
    })) || [],
});

export default tenderedData;
