import { Status } from '@vroom-web/networking';
import { Vehicles } from '@vroom-web/networking/dist/generated/graphql-types';
import { action, makeObservable, observable } from 'mobx';

import states from './data/states.json';
import Model from './Model';
import { LicensePlateViewProps } from './View';
export default class LicensePlateViewModel implements LicensePlateViewProps {
  plate = '';
  state: undefined | { value: string; label: string } = undefined;
  model: Model | undefined = undefined;
  vehicles: { car: string; vin: string }[] = [];
  trackLicensePlateClick?: () => void;
  onStepBack?: () => void;

  constructor(
    model: Model,
    trackLicensePlateClick?: () => void,
    onStepBack?: () => void
  ) {
    makeObservable(this, {
      plate: observable,
      state: observable,
      vehicles: observable,
      setPlate: action,
      setState: action,
      setVehicles: action,
    });
    this.onStepBack = onStepBack;
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

    return 'Continue';
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
          const vehicles = this.model.data.licensePlateToVin
            .vehicles as Array<Vehicles>;

          if (vehicles.length === 1) {
            const vin = (this.model.data.licensePlateToVin
              .vehicles as Array<Vehicles>)[0].vin;

            this.trackLicensePlateClick && this.trackLicensePlateClick();
            window.location.href = `/tradeIn-selfService/${vin}`;
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

  onLicensePlateInput = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setPlate(event.currentTarget.value.toUpperCase());
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

  onBackToPurchase = (): void => {
    this.onStepBack && this.onStepBack();
  };

  getStates = (): { value: string; label: string }[] => states;
}
