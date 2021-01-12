import { addressToStringArray } from '..';
import { Accessor, TableData } from '../Table';

import { Model } from 'src/mvvm';
import { Shipment } from 'src/networking/models/Shipments';

type ViewProps = TableData;

const cancelledData = ({
  response,
}: Model<{ shipments: Shipment[] }, {}, {}>): ViewProps => ({
  headers: [
    { display: 'VIN', accessor: Accessor.vin },
    { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
    {
      display: 'Cancelled Date',
      accessor: Accessor.cancelledDate,
      sortBy: true,
    },
    { display: 'Posted Date', accessor: Accessor.postedDate, sortBy: true },
    { display: 'Origin', accessor: Accessor.originAddress },
    { display: 'Destination', accessor: Accessor.destinationAddress },
    { display: 'Blackout Dates', accessor: Accessor.blackoutDates },
    { display: 'Reason', accessor: Accessor.reason },
  ],
  rows:
    response?.shipments.map((row: Shipment) => ({
      id: row.vin,
      data: {
        [Accessor.vin]: row.vin,
        [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`,
        [Accessor.cancelledDate]: row.date_cancelled || '',
        [Accessor.postedDate]: row.date_posted || '',
        [Accessor.originAddress]: addressToStringArray(row.origin_address),
        [Accessor.destinationAddress]: addressToStringArray(
          row.destination_address
        ),
        [Accessor.blackoutDates]:
          row.blackout_dates?.map((date) => date.start) || '',
        [Accessor.reason]: row.notes || '',
      },
    })) || [],
});

export default cancelledData;
