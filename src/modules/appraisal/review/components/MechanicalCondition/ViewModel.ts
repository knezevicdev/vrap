import { NextRouter } from 'next/router';

import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly mechanicalConditionInfotitle: string = 'Mechanical Condition';
  readonly runnable: string = 'Vehicle Runs';
  readonly mechanicalCondition: string = 'Mechanical Condition';
  readonly warningLights: string = 'Active Warning Lights';
  readonly floodFireDamage: string = 'Water or Fire Damage';
  readonly additionalDetails: string = 'Additional Information';
  readonly edit: string = 'Edit';

  constructor(private _store: Store, private _router: NextRouter) {}

  get warningLightsValues(): any {
    return this._store.appraisal.mechConditionForm.warningLightsValues;
  }

  handleEditClick(): void {
    this._router.push({
      pathname: `/sell/vehicleInformation`,
      query: {
        vehicle: `${this._store.appraisal?.vehicleInfoForm?.vin}`,
      },
      hash: `#mechanicalcondition`,
    });
  }
}
