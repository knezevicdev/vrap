import { action, makeObservable, observable } from 'mobx';

import { ModalProps } from './View';

export enum USE_ON_PAGE {
  CONGRATS_PAGE,
  VEHICLE_TRADE_IN,
}

export default class ModalViewModel implements ModalProps {
  selectedVin: undefined | string;
  vehicles: { car: string; vin: string }[];
  close: () => void;
  isOpen: boolean;
  isNextDisabled = true;
  trackLicensePlateClick?: () => void;
  useOnPage: USE_ON_PAGE;

  constructor(
    vehicles: { car: string; vin: string }[],
    close: () => void,
    isOpen: boolean,
    useOnPage: USE_ON_PAGE = USE_ON_PAGE.CONGRATS_PAGE,
    trackLicensePlateClick?: () => void
  ) {
    makeObservable(this, {
      selectedVin: observable,
      setSelectedVin: action,
    });
    this.useOnPage = useOnPage;
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
    if (this.useOnPage === USE_ON_PAGE.VEHICLE_TRADE_IN) {
      window.location.href = `/tradeIn-selfService/${this.selectedVin}`;
    } else {
      window.location.href = `/sell/vehicleInformation/${this.selectedVin}`;
    }
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
