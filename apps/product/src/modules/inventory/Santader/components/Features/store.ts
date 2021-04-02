import { action, makeObservable, observable } from 'mobx';

export class FeaturesStore {
  @observable limited = true;

  constructor() {
    makeObservable(this);
  }

  @action
  toggleLimited(): void {
    this.limited = !this.limited;
  }
}
