import { action, observable } from 'mobx';

class Store {
  @observable isDrawerOpen = false;

  @action
  setIsDrawerOpen = (open: boolean): void => {
    this.isDrawerOpen = open;
  };
}

export default Store;
