import { addressToStringArray } from '..';
import { Modals } from '../PopoverButton';
import { Accessor, TableData } from '../Table';

import { Model } from 'src/mvvm';
import { Shipment } from 'src/networking/models/Shipments';

type ViewProps = TableData;

const transitData = ({
  response,
}: Model<{ shipments: Shipment[] }, {}, {}>): ViewProps => ({
  headers: [
    { display: 'VIN', accessor: Accessor.vin },
    { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
    {
      display: 'Picked Up Date',
      accessor: Accessor.pickedUpDate,
      sortBy: true,
    },
    { display: 'Origin', accessor: Accessor.originAddress },
    { display: 'Destination', accessor: Accessor.destinationAddress },
    { display: 'Blackout Dates', accessor: Accessor.blackoutDates },
    { display: 'Estimated Delivery', accessor: Accessor.estimatedDeliveryDate },
    { display: 'Action(s)', accessor: Accessor.actions },
  ],
  rows:
    response?.shipments.map((row: Shipment) => ({
      id: row.vin,
      data: {
        [Accessor.vin]: row.vin,
        [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`,
        [Accessor.pickedUpDate]: row.date_posted || '',
        [Accessor.originAddress]: addressToStringArray(row.origin_address),
        [Accessor.destinationAddress]: addressToStringArray(
          row.destination_address
        ),
        [Accessor.blackoutDates]:
          row.blackout_dates?.map((date) => date.start) || '',
        [Accessor.estimatedDeliveryDate]: row.estimated_delivery || '',
        [Accessor.actions]: [
          {
            text: 'Delivered',
            popover: Modals.deliver,
            handler: (): void => undefined,
            primary: true,
          },
          {
            text: 'Cancel',
            popover: Modals.cancel,
            handler: (): void => undefined,
          },
        ],
      },
    })) || [],
});

export default transitData;
