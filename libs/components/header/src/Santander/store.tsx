import { action, observable } from 'mobx';

class Store {
  @observable isOpen = true;

  @action
  setIsOpen = (isOpen: boolean): void => {
    this.isOpen = isOpen;
  };
}

export default Store;
