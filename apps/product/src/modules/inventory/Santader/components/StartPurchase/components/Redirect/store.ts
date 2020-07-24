import { action, observable } from 'mobx';

export class RedirectStore {
  @observable secondsLeft = 6;

  @action
  decrementSeconds = (): void => {
    if (this.secondsLeft !== 0) {
      this.secondsLeft = this.secondsLeft - 1;
    }
  };
}
