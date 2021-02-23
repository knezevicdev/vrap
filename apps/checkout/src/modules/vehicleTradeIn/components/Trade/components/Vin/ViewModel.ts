import { action, makeObservable, observable } from 'mobx';

import { VinProps } from './View';

import { getCurrentVin } from 'src/networking/util/getCurrentVin';

export default class VinViewModel implements VinProps {
  vin = '';
  trackVinClick?: () => void;

  constructor(trackVinClick?: () => void) {
    makeObservable(this, {
      vin: observable,
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
    window.location.href = `/tradeIn-selfService/${this.vin}`;
  };

  setVin = (value: string): void => {
    this.vin = value;
  };

  getVin = (): string => {
    return this.vin;
  };

  onVinInput = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
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

  onBackToPurchase = (): void => {
    const vin = getCurrentVin();
    window.location.href = `/e2e/${vin}/checkoutTradeIn`;
  };
}
