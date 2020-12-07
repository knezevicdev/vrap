import { TableData } from 'src/components/SimpleTable';
import { Model } from 'src/mvvm';
import { Shipment } from 'src/networking/models/Shipments';

enum Accessor {
  vin,
  yearMakeModel,
  posted,
  origin,
  destination,
  blackoutDates,
  notes,
  pickedUp,
}

type ViewProps = TableData<Accessor>;

export const viewModel = ({
  response,
}: Model<Shipment[], {}, {}>): ViewProps => ({
  headers: [
    { display: 'VIN', accessor: Accessor.vin },
    { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
    { display: 'Posted', accessor: Accessor.posted },
    { display: 'Origin', accessor: Accessor.origin },
    { display: 'Destination', accessor: Accessor.destination },
    { display: 'Blackout Dates', accessor: Accessor.blackoutDates },
    { display: 'Notes', accessor: Accessor.notes },
    { display: 'Picked Up?', accessor: Accessor.pickedUp },
  ],
  rows:
    response?.map((row: Shipment) => ({
      id: row.vin,
      data: {
        [Accessor.vin]: row.vin,
        [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`, // row.yearMakeModel,
        [Accessor.posted]: row.date_posted || '',
        [Accessor.origin]: row.origin_address.to_string,
        [Accessor.destination]: row.destination_address.to_string,
        [Accessor.blackoutDates]: row.blackout_dates?.[0]?.to_string ?? '', // TODO: show whole array
        [Accessor.notes]: row.notes || '',
        [Accessor.pickedUp]: row.date_delivered || '', // TODO: I don't think this exists yet
      },
    })) || [],
});
