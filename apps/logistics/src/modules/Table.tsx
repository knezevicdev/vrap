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
        [Accessor.yearMakeModel]: row.yearMakeModel,
        [Accessor.posted]: row.posted,
        [Accessor.origin]: row.origin,
        [Accessor.destination]: row.destination,
        [Accessor.blackoutDates]: row.blackoutDates[0], // TODO: show whole array
        [Accessor.notes]: row.notes,
        [Accessor.pickedUp]: row.pickedUp,
      },
    })) || [],
});
