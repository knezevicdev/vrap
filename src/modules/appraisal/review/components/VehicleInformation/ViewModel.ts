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

  constructor(private store: Store) {}

  handleEditClick(): void {
    window.location.href = `/sell/vehicleInformation/${this.store.appraisal?.appraisalDetail?.vehicleInfoForm?.vin}#top`;
  }
}
