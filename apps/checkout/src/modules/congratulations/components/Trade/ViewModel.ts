import { action, makeObservable, observable } from 'mobx';

import { TradeProps } from './View';

enum Tab {
  LICENSE_PLATE,
  VIN,
}

export default class TradeViewModel implements TradeProps {
  activeTab: number = Tab.LICENSE_PLATE;

  constructor() {
    makeObservable(this, {
      activeTab: observable,
      setActiveTab: action,
    });
  }

  setActiveTab = (tab: Tab): void => {
    this.activeTab = tab;
  };

  isLicensePlateActive = (): boolean => {
    return this.activeTab === Tab.LICENSE_PLATE;
  };

  isVinActive = (): boolean => {
    return this.activeTab === Tab.VIN;
  };

  showLicensePlate = (): boolean => {
    return this.isLicensePlateActive();
  };

  onLicensePlateClick = (): void => {
    this.setActiveTab(Tab.LICENSE_PLATE);
  };

  onVinClick = (): void => {
    this.setActiveTab(Tab.VIN);
  };
}
