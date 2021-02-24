import debounce from 'lodash/debounce';
import { action, makeObservable, observable } from 'mobx';

import { VinProps } from './View';

import { getCurrentVin } from 'src/networking/util/getCurrentVin';
import { validateVin } from 'src/utils/validateVin';

export default class VinViewModel implements VinProps {
  vin = '';
  validateVin = false;
  debounceFunc: any = null;
  trackVinClick?: () => void;

  constructor(trackVinClick?: () => void) {
    makeObservable(this, {
      vin: observable,
      validateVin: observable,
      setVinValidationError: action,
      setVin: action,
    });

    this.trackVinClick = trackVinClick;
  }

  getIsButtonDisabled = (): boolean => {
    const hasInput = this.vin.length === 17;

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

  setVinValidationError = (status: boolean): void => {
    this.validateVin = status === undefined ? true : status;
  };

  onVinInput = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    this.debounceFunc && this.debounceFunc.cancel();
    this.debounceFunc = debounce(this.setVinValidationError, 500);

    if (value.length < 18) {
      this.setVin(value.toUpperCase());
      this.setVinValidationError(false);
    }
    this.debounceFunc();
  };

  getError = (): string | undefined => {
    const hasInput = this.vin.length > 0;
    const hasMetLength = hasInput ? this.vin.length === 17 : false;
    const hasMetRegex = hasInput && validateVin(this.vin);

    if (hasInput && !hasMetLength && this.validateVin) {
      return 'Minimum length not met.';
    }

    if (hasInput && hasMetLength) {
      return hasMetRegex ? undefined : 'Please enter a valid vin';
    }

    return hasInput ? ' ' : undefined;
  };

  onBackToPurchase = (): void => {
    const vin = getCurrentVin();
    window.location.href = `/e2e/${vin}/checkoutTradeIn`;
  };
}
