import { Status } from '@vroom-web/networking';
import { Vehicles } from '@vroom-web/networking/dist/generated/graphql-types';
import { action, makeObservable, observable } from 'mobx';

import Model from './Model';
import { LicensePlateViewProps } from './View';

export default class LicensePlateViewModel implements LicensePlateViewProps {
  plate = '';
  state: undefined | { value: string; label: string } = undefined;
  model: Model | undefined = undefined;
  vehicles: { car: string; vin: string }[] = [];
  trackLicensePlateClick?: () => void;

  constructor(model: Model, trackLicensePlateClick?: () => void) {
    makeObservable(this, {
      plate: observable,
      state: observable,
      vehicles: observable,
      setPlate: action,
      setState: action,
      setVehicles: action,
    });

    this.model = model;
    this.trackLicensePlateClick = trackLicensePlateClick;
  }

  setVehicles = (vehicles: { car: string; vin: string }[]): void => {
    this.vehicles = vehicles;
  };

  getVehicles = (): { car: string; vin: string }[] => {
    return this.vehicles;
  };

  closeDialog = (): void => {
    this.setVehicles([]);
  };

  getIsDialogOpen = (): boolean => {
    return this.vehicles.length > 0;
  };

  getButtonText = (): string => {
    if (this.model?.dataStatus === Status.LOADING) {
      return 'Looking up your vehicle';
    }

    return 'What’s my car worth?';
  };

  setPlate = (plate: string): void => {
    this.plate = plate;
  };

  setState = (state: undefined | { value: string; label: string }): void => {
    this.state = state;
  };

  getIsButtonDisabled = (): boolean => {
    if (this.state === undefined || this.plate.length === 0) {
      return true;
    }

    if (this.state && this.hasExceededLimit()) {
      return true;
    }

    if (this.state && this.hasSpecialCharacters()) {
      return true;
    }

    if (this.model?.dataStatus === Status.LOADING) {
      return true;
    }

    return false;
  };

  onButtonClick = (): void => {
    this.model
      ?.getData(
        this.plate,
        (this.state as { value: string; label: string }).value
      )
      .then(() => {
        if (
          this.model &&
          this.model.data &&
          this.model.data.licensePlateToVin &&
          this.model.data.licensePlateToVin.vehicles
        ) {
          const vehicles = this.model.data.licensePlateToVin.vehicles as Array<
            Vehicles
          >;

          if (vehicles.length == 1) {
            const vin = (this.model.data.licensePlateToVin.vehicles as Array<
              Vehicles
            >)[0].vin;
            console.log(this.trackLicensePlateClick);
            this.trackLicensePlateClick && this.trackLicensePlateClick();
            window.location.href = `/sell/vehicleInformation/${vin}`;
          }

          if (vehicles.length > 1) {
            const modalVehicles = vehicles.map((vehicle) => {
              return {
                car: `${vehicle.modelYear} ${vehicle.make}`,
                vin: vehicle.vin,
              };
            });

            this.setVehicles(modalVehicles);
          }
        }
      });
  };

  getPlate = (): string => {
    return this.plate;
  };

  onLicensePlateInput = (value: string): void => {
    this.setPlate(value.toUpperCase());
  };

  onStateSelected = (value: string, label: string): void => {
    this.setState({ value: value, label: label });
  };

  private hasExceededLimit = (): boolean => {
    return this.plate.length > 8;
  };

  private hasSpecialCharacters = (): boolean => {
    const specials = /[^A-Za-z 0-9]/g;
    return specials.test(this.plate);
  };

  getErrorForLicensePlate = (): string | undefined => {
    if (this.hasExceededLimit() || this.hasSpecialCharacters()) {
      return 'PLEASE ENTER A VALID LICENSE PLATE NUMBER';
    }

    if (this.model?.dataStatus === Status.ERROR) {
      return 'We could not identify the vehicle associated with this license plate. Please try again.';
    }

    return undefined;
  };

  getStates = (): { value: string; label: string }[] => {
    return [
      { value: 'AK', label: 'AK' },
      { value: 'AL', label: 'AL' },
      { value: 'AR', label: 'AR' },
      { value: 'AZ', label: 'AZ' },
      { value: 'CA', label: 'CA' },
      { value: 'CO', label: 'CO' },
      { value: 'CT', label: 'CT' },
      { value: 'DC', label: 'DC' },
      { value: 'DE', label: 'DE' },
      { value: 'FL', label: 'FL' },
      { value: 'GA', label: 'GA' },
      { value: 'HI', label: 'HI' },
      { value: 'IA', label: 'IA' },
      { value: 'ID', label: 'ID' },
      { value: 'IL', label: 'IL' },
      { value: 'IN', label: 'IN' },
      { value: 'KS', label: 'KS' },
      { value: 'KY', label: 'KY' },
      { value: 'LA', label: 'LA' },
      { value: 'MA', label: 'MA' },
      { value: 'MD', label: 'MD' },
      { value: 'ME', label: 'ME' },
      { value: 'MI', label: 'MI' },
      { value: 'MN', label: 'MN' },
      { value: 'MO', label: 'MO' },
      { value: 'MS', label: 'MS' },
      { value: 'MT', label: 'MT' },
      { value: 'NC', label: 'NC' },
      { value: 'ND', label: 'ND' },
      { value: 'NE', label: 'NE' },
      { value: 'NH', label: 'NH' },
      { value: 'NJ', label: 'NJ' },
      { value: 'NM', label: 'NM' },
      { value: 'NV', label: 'NV' },
      { value: 'NY', label: 'NY' },
      { value: 'OH', label: 'OH' },
      { value: 'OK', label: 'OK' },
      { value: 'OR', label: 'OR' },
      { value: 'PA', label: 'PA' },
      { value: 'RI', label: 'RI' },
      { value: 'SC', label: 'SC' },
      { value: 'SD', label: 'SD' },
      { value: 'TN', label: 'TN' },
      { value: 'TX', label: 'TX' },
      { value: 'UT', label: 'UT' },
      { value: 'VA', label: 'VA' },
      { value: 'VT', label: 'VT' },
      { value: 'WA', label: 'WA' },
      { value: 'WI', label: 'WI' },
      { value: 'WV', label: 'WV' },
      { value: 'WY', label: 'WY' },
    ];
  };
}
