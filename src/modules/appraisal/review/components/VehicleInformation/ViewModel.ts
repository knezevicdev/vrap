import { NextRouter } from 'next/router';

import Store from 'src/store';
import { AppraisalStore } from 'src/store/appraisalStore';

export default class PickupInfoReviewViewModel {
  readonly vehicleInformationInfotitle: string = 'Vehicle Information';
  readonly vin: string = 'VIN';
  readonly trim: string = 'Trim';
  readonly mileage: string = 'Mileage';
  readonly exteriorColor: string = 'Exterior Color';
  readonly keysAmount: string = 'Number of Keys';
  readonly vehicleOptions: string = 'Options';
  readonly zipCode: string = 'Zip Code';
  readonly edit: string = 'Edit';
  appraisalStore: AppraisalStore;

  constructor(store: Store, private _router: NextRouter) {
    this.appraisalStore = store.appraisal;
  }

  get vehicleFormInfoVin(): string {
    return this.appraisalStore.vehicleInfoForm.vin;
  }

  get vehicleFormInfoTrim(): string {
    return this.appraisalStore.vehicleInfoForm.trim;
  }

  get vehicleFormInfoMileage(): number | null {
    return this.appraisalStore.vehicleInfoForm.mileage;
  }

  get vehicleFormInfoZipCode(): string {
    return this.appraisalStore.vehicleInfoForm.zipCode;
  }

  get vehicleFormInfoYear(): number | null {
    return this.appraisalStore.vehicleInfoForm.year;
  }

  get vehicleFormInfoMake(): string {
    return this.appraisalStore.vehicleInfoForm.make;
  }

  get vehicleFormInfoModel(): string {
    return this.appraisalStore.vehicleInfoForm.model;
  }

  get vehicleFormInfoColor(): string {
    return this.appraisalStore.vehicleInfoForm.exteriorColor;
  }

  get vehicleFormInfoKeys(): string {
    return this.appraisalStore.vehicleInfoForm.keysAmount;
  }

  get vehicleFormInfoOptions(): any {
    return this.appraisalStore.vehicleInfoForm.vehicleOptions;
  }

  handleEditClick(): void {
    this._router.push({
      pathname: this.appraisalStore.appraisalPath,
      query: {
        vehicle: `${this.appraisalStore?.vehicleInfoForm?.vin}`,
      },
      hash: `#top`,
    });
  }
}
