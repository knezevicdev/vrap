import { NextRouter } from 'next/router';

import Store from 'src/store';

export default class PickupInfoReviewViewModel {
  readonly exteriorConditionInfotitle: string = 'Exterior Condition';
  readonly exteriorCondition: string = 'Exterior Condition';
  readonly hailDamage: string = 'Hail Damage';
  readonly tiresAndWheels: string = 'Tires and Wheels';
  readonly afterMarket: string = 'Aftermarket Modifications';
  readonly rust: string = 'Rust';
  readonly dents: string = 'Dents';
  readonly paintChipping: string = 'Paint Chipping';
  readonly scratches: string = 'Scratches';
  readonly edit: string = 'Edit';

  constructor(private _store: Store, private _router: NextRouter) {}

  get afterMarketOptions(): any {
    return this._store.appraisal.extConditionForm.afterMarket;
  }

  get isDetailedConditionsExperiment(): boolean {
    return this._store.absmart.isInExperiment(
      'appraisal-detailed-condition-questions'
    );
  }

  handleEditClick(): void {
    this._router.push({
      pathname: `/sell/vehicleInformation`,
      query: {
        vehicle: `${this._store.appraisal?.vehicleInfoForm?.vin}`,
      },
      hash: `#exteriorcondition`,
    });
  }
}
