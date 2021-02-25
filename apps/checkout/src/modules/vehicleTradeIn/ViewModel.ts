import { GQLTypes, Status } from '@vroom-web/networking';
import head from 'lodash/head';
import { action, makeObservable, observable } from 'mobx';

import Model from './Model';

import Navigation from 'src/navigation/Navigation';
export default class VehicleTradeInViewModel {
  model: Model;
  isOpen = false;
  navigation: Navigation;

  constructor(model: Model) {
    this.model = model;
    makeObservable(this, {
      isOpen: observable,
      setIsOpen: action,
      onStepBack: action,
    });

    this.navigation = new Navigation();
  }
  openDialog = (): void => {
    this.setIsOpen(true);
  };
  setIsOpen = (isOpen: boolean): void => {
    this.isOpen = isOpen;
  };

  closeDialog = (): void => {
    this.setIsOpen(false);
  };

  getIsOpen = (): boolean => {
    return this.isOpen;
  };

  get dealStatus(): GQLTypes.DealStatus | undefined {
    if (this.model.dataStatus === Status.SUCCESS) {
      const deal = head(this.model.data.user.deals);
      return deal && deal.dealSummary.dealStatus;
    }
  }

  onStepBack = (): void => {
    this.navigation.stepBack(this.dealStatus);
  };
}
