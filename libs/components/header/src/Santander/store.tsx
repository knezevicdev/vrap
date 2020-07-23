import { action, observable } from 'mobx';

class Store {
  @observable isOpen = false;
  @observable isDrawerOpen = false;

  @action
  setIsOpen = (open: boolean): void => {
    this.isOpen = open;
  };

  @action
  setIsDrawerOpen = (open: boolean): void => {
    this.isDrawerOpen = open;
  };
}

export default Store;
