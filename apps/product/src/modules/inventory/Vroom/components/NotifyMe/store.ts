import { action, observable } from 'mobx';

export class NotifyMeStore {
  @observable modalOpen = false;

  @action
  toggleModal = (): void => {
    this.modalOpen = !this.modalOpen;
  };
}
