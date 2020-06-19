import axios from 'axios';
import { action, observable, runInAction } from 'mobx';

export class LicensePlateStore {
  @observable selectedState = '';
  @observable licensePlate = '';
  @observable hasError = false;
  @observable vehicles:
    | [
        {
          vin: string;
          modelYear: number;
          make: string;
        }
      ]
    | undefined = undefined;
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
    const query = `
        {
            licensePlateToVin(lp:"${this.licensePlate}",state:"${this.selectedState}"){
                vehicles{
                    vin
                    stateOfRegistration
                    modelYear
                    restrictedStateIndicator
                    make
                }
            }
        }`.trim();
    try {
      runInAction(() => {
        this.fetching = true;
      });
      axios
        .post(`https://gearbox-dev-int.vroomapi.com/query-public`, {
          query,
        })
        .then((res) => {
          const data = res.data.data;
          if (data) {
            const vehicles = data.licensePlateToVin.vehicles;

            if (vehicles.length === 1) {
              const vin = vehicles[0].vin;
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
