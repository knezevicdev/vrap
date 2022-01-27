import { NextRouter } from 'next/router';

import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly vehicleHistoryInfotitle: string = 'Vehicle History';
  readonly accident: string = 'Accident';
  readonly title: string = 'Title';
  readonly edit: string = 'Edit';

  constructor(private _store: Store, private _router: NextRouter) {}

  handleEditClick(): void {
    this._router.push({
      pathname: `/`,
      query: {
        vehicle: `${this._store.appraisal?.vehicleInfoForm?.vin}`,
      },
      hash: `#vehiclehistory`,
    });
  }
}
