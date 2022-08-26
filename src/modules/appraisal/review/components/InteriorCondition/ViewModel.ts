import { NextRouter } from 'next/router';

import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly interiorConditionInfotitle: string = 'Interior Condition';
  readonly interiorMaterial: string = 'Interior Material';
  readonly interiorCondition: string = 'Interior Condition';
  readonly odor: string = 'Odor';
  readonly edit: string = 'Edit';

  constructor(private _store: Store, private _router: NextRouter) {}

  handleEditClick(): void {
    this._router.push({
      pathname: this._store.appraisal.appraisalPath,
      query: {
        vehicle: `${this._store.appraisal?.vehicleInfoForm?.vin}`,
        ...this._router.query,
      },
      hash: `#interiorcondition`,
    });
  }
}
