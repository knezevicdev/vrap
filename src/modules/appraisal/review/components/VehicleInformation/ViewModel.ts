import { NextRouter } from 'next/router';

import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly vehicleInformationInfotitle: string = 'Vehicle Information';
  readonly vin: string = 'VIN';
  readonly trim: string = 'Trim';
  readonly mileage: string = 'Mileage';
  readonly exteriorColor: string = 'Exterior Color';
  readonly keysAmount: string = 'Number of Keys';
  readonly vehicleOptions: string = 'Options';
  readonly edit: string = 'Edit';

  constructor(private _store: Store, private _router: NextRouter) {}

  handleEditClick(): void {
    this._router.push({
      pathname: `/`,
      query: {
        vehicle: `${this._store.appraisal?.vehicleInfoForm?.vin}#top`,
      },
    });
  }
}
