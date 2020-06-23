import { action, observable, runInAction } from 'mobx';

import LicensePlateToVinNetworker, {
  Vehicles,
} from './LicensePlateToVinNetworker';

import globalEnv from 'src/globalEnv';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

export class LicensePlateStore {
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
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
    this.licensePlate = licensePlate;
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

            if (vehicles.length === 1) {
              const vin = vehicles[0].vin;
              this.analyticsHandler.trackWhatIsMyCarWorthClicked(false);
              window.location.href = `sell/vehicleInformation/${vin}`;
            } else {
              runInAction(() => {
                this.hasError = false;
                this.vehicles = vehicles;
                this.isDialogOpen = true;
                this.fetching = false;
              });
            }
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