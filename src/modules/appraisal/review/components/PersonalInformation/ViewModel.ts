import { NextRouter } from 'next/router';

import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly personalInformationInfotitle: string = 'Your Information';
  readonly name: string = 'Name';
  readonly email: string = 'Email Address';
  readonly phoneNumber: string = 'Phone Number';
  readonly edit: string = 'Edit';

  constructor(private _store: Store, private _router: NextRouter) {}

  handleEditClick(): void {
    this._router.push({
      pathname: this._store.appraisal.appraisalPath,
      query: {
        vehicle: `${this._store.appraisal?.vehicleInfoForm?.vin}`,
      },
      hash: `#personalinformation`,
    });
  }
}
