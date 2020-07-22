import { action, observable } from 'mobx';

class Store {
  @observable isOpen = false;

  @action
  setIsOpen = (isOpen: boolean): void => {
    this.isOpen = isOpen;
  };
}

export default Store;
