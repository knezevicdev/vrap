import { action, observable, runInAction } from 'mobx';
import getConfig from 'next/config';

import LicensePlateToVinNetworker, {
  Vehicles,
} from './LicensePlateToVinNetworker';

const { publicRuntimeConfig } = getConfig();

export class LicensePlateStore {
  private licensePlateToVinNetworker = new LicensePlateToVinNetworker(
    publicRuntimeConfig.GEARBOX_PUBLIC_URL as string
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
    const formattedValue = licensePlate.replace(/\s/g, '').toUpperCase();
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
  getVehicles = (): Promise<void> => {
    runInAction(() => {
      this.fetching = true;
    });
    return this.licensePlateToVinNetworker
      .getVin(this.licensePlate, this.selectedState)
      .then((res) => {
        const data = res.data;
        if (data) {
          const vehicles = data.licensePlateToVin.vehicles;
          const multipleVehicles = vehicles.length > 1;

          runInAction(() => {
            this.hasError = false;
            this.vehicles = vehicles;
            this.isDialogOpen = multipleVehicles;
            this.fetching = false;
          });
        } else {
          throw new Error('No vehicle data in getVin response');
        }
      })
      .catch(() => {
        runInAction(() => {
          this.hasError = true;
          this.isDialogOpen = false;
          this.fetching = false;
        });
      });
  };
}
