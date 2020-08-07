import { action, observable, runInAction } from 'mobx';

import LicensePlateToVinNetworker, {
  Vehicles,
} from './LicensePlateToVinNetworker';

import globalEnv from 'src/globalEnv';

export class LicensePlateStore {
  private licensePlateToVinNetworker = new LicensePlateToVinNetworker(
    globalEnv.GEARBOX_PUBLIC_URL as string
  );

  @observable selectedState = '';
  @observable licensePlate = '';
  @observable hasError = false;
  @observable vehicles: Vehicles[] | undefined = undefined;
  @observable isDialogOpen = false;
  @observable fetching = false;

  @action
  setSelectedState = (state: string): void => {
    this.selectedState = state;
  };

  @action
  setLicensePlate = (licensePlate: string): void => {
    const formattedValue = licensePlate.replace(/\s/g, '');
    const licenseValidated =
      formattedValue.length <= 8 && /^[0-9a-zA-Z-]+$/.test(formattedValue);

    this.licensePlate = formattedValue;
    this.hasError = !licenseValidated;
  };

  @action
  setIsDialogOpen = (): void => {
    this.isDialogOpen = !this.isDialogOpen;
  };

  @action
  getVehicles = async (): Promise<void> => {
    try {
      runInAction(() => {
        this.fetching = true;
      });
      this.licensePlateToVinNetworker
        .getVin(this.licensePlate, this.selectedState)
        .then((res) => {
          const data = res.data;
          if (data) {
            const vehicles = data.licensePlateToVin.vehicles;

            runInAction(() => {
              this.hasError = false;
              this.vehicles = vehicles;
              this.isDialogOpen = true;
              this.fetching = false;
            });
          } else {
            runInAction(() => {
              this.hasError = true;
              this.isDialogOpen = false;
              this.fetching = false;
            });
          }
        });
    } catch {
      runInAction(() => {
        this.hasError = true;
        this.isDialogOpen = false;
        this.fetching = false;
      });
    }
  };
}
