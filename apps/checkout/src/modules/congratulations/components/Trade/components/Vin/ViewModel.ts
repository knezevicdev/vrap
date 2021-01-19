import { action, makeObservable, observable } from 'mobx';

import { VinProps } from './View';

export default class VinViewModel implements VinProps {
  isOpen = false;
  vin = '';
  trackVinClick?: () => void;

  constructor(trackVinClick?: () => void) {
    makeObservable(this, {
      isOpen: observable,
      vin: observable,
      setIsOpen: action,
      setVin: action,
    });

    this.trackVinClick = trackVinClick;
  }

  getIsButtonDisabled = (): boolean => {
    const hasInput = this.vin.length > 0;

    if (!hasInput) {
      return true;
    }

    return this.getError() !== undefined;
  };

  onButtonClick = (): void => {
    this.trackVinClick && this.trackVinClick();
    window.location.href = `/sell/vehicleInformation/${this.vin}`;
  };

  setIsOpen = (isOpen: boolean): void => {
    this.isOpen = isOpen;
  };

  setVin = (value: string): void => {
    this.vin = value;
  };

  closeDialog = (): void => {
    this.setIsOpen(false);
  };

  openDialog = (): void => {
    this.setIsOpen(true);
  };

  getIsOpen = (): boolean => {
    return this.isOpen;
  };

  getVin = (): string => {
    return this.vin;
  };

  onVinInput = (value: string): void => {
    if (value.length < 18) {
      this.setVin(value.toUpperCase());
    }
  };

  getError = (): string | undefined => {
    const hasInput = this.vin.length > 0;
    const hasMetLength = hasInput ? this.vin.length === 17 : false;
    const hasMetRegex = hasInput ? /^[A-Za-z0-9]+$/.test(this.vin) : true;

    if (hasInput && !hasMetLength) {
      return 'Minimum length not met.';
    }

    if (hasInput && hasMetLength) {
      return hasMetRegex ? undefined : 'Please enter a valid vin';
    }

    return undefined;
  };
}
