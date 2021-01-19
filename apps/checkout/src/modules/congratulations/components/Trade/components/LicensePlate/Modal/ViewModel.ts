import { action, makeObservable, observable } from 'mobx';

import { ModalProps } from './View';

export default class ModalViewModel implements ModalProps {
  selectedVin: undefined | string;
  vehicles: { car: string; vin: string }[];
  close: () => void;
  isOpen: boolean;
  isNextDisabled = true;
  trackLicensePlateClick?: () => void;

  constructor(
    vehicles: { car: string; vin: string }[],
    close: () => void,
    isOpen: boolean,
    trackLicensePlateClick?: () => void
  ) {
    makeObservable(this, {
      selectedVin: observable,
      setSelectedVin: action,
    });

    this.vehicles = vehicles;
    this.close = close;
    this.isOpen = isOpen;
    this.trackLicensePlateClick = trackLicensePlateClick;
  }

  setSelectedVin = (vin: string): void => {
    this.isNextDisabled = false;
    this.selectedVin = vin;
  };

  onNextClick = (): void => {
    this.trackLicensePlateClick && this.trackLicensePlateClick();
    window.location.href = `/sell/vehicleInformation/${this.selectedVin}`;
  };

  getIsNextDisabled = (): boolean => {
    return this.isNextDisabled;
  };

  getSelectedVin = (): string | undefined => {
    return this.selectedVin;
  };

  onSelect = (vin: string) => (): void => {
    this.setSelectedVin(vin);
  };
}
