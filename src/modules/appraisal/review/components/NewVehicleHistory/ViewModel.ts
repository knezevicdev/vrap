import { NextRouter } from 'next/router';

import Store from 'src/store';

export default class NewVehicleHistoryViewModel {
  readonly vehicleHistoryInfotitle: string = 'Vehicle History & Condition';
  readonly accident: string = 'Accident';
  readonly stateOfPurchase: string = 'State of Purchase';
  readonly loanLease: string = 'Loan or lease on your vehicle?';
  readonly bankName: string = 'Bank Name';
  readonly title: string = 'Title';
  readonly edit: string = 'Edit';

  constructor(private _store: Store, private _router: NextRouter) {}

  handleEditClick(): void {
    this._router.push({
      pathname: this._store.appraisal.appraisalPath,
      query: {
        vehicle: `${this._store.appraisal?.vehicleInfoForm?.vin}`,
        ...this._router.query,
      },
      hash: `#vehiclehistory`,
    });
  }

  get warningLightsValues(): string[] {
    return this._store.appraisal.mechConditionForm.warningLightsValues;
  }

  get afterMarketOptions(): string[] {
    return this._store.appraisal.extConditionForm.afterMarket;
  }
}