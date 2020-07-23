import { action, observable } from 'mobx';

export class Store {
  @observable secondsLeft = 6;

  @action
  decrementSeconds = (): void => {
    if (this.secondsLeft !== 0) {
      this.secondsLeft = this.secondsLeft - 1;
    }
  };
}
