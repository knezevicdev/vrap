import { action, observable } from 'mobx';

export class FeaturesStore {
  @observable limited = true;

  @action
  toggleLimited = (): void => {
    this.limited = !this.limited;
  };
}
